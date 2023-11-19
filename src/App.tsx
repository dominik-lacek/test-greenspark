import React from 'react';
import './App.scss';
import { ProductWidget, Props as ProductWidgetData } from './components/productionWidget/ProductWidget';

type Props = {
    
}

type State = {
  widgetData: ProductWidgetData[];
  activeID:number;
}

export class App extends React.Component<Props,State> {

  constructor(props: Props){
    super(props);
    this.state = {
      widgetData: [] as ProductWidgetData[],
      activeID: -1,
    };
  }

  componentDidMount(): void {
    fetch('https://api.mocki.io/v2/016d11e8/product-widgets')
      .then(response => response.json())
      .then(data => this.setState({widgetData: this.parseProductionWidgetData(data)}))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App_root">
        <div className="App_content">
          <div className="App_title">
            <h1>
              Per product widgets
            </h1>
          </div>
          <div className="App_widgetsRow">
            {this.state.widgetData.map((data: Omit<ProductWidgetData, 'active'>, index: number) =>{
              return (
                <ProductWidget
                  key={index}
                  {...data}
                  active={this.state.activeID == data.id}
                  onToggleActive={this.onToggleActive}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  private parseProductionWidgetData (data: JSON):ProductWidgetData[] {
    let parsedData:ProductWidgetData[] = [];
    Object.entries(data).forEach((entry) => { 
      parsedData.push({...entry[1]});
      if (parsedData[parsedData.length -1].active){
        this.setState({activeID: parsedData[parsedData.length -1].id})
      }
    })
    return parsedData;
  }

  private onToggleActive = (id: number) =>{
    if (this.state.activeID == id){
      this.setState({activeID: -1});
    }
    else{
      this.setState({activeID: id});
    }
  }
}
