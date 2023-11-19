import classNames from 'classnames';
import React from 'react';
import { ALL_COLORS, formatAction, formatType, getColorContrastModifer as getContrastColor } from '../../config';
import { CheckBox } from '../checkbox/CheckBox';
import { ColorButton } from '../colorButton/ColorButton';
import { Toggle } from '../toggle/Toggle';
import { Tooltip } from '../tooltip/Tooltip';
import './ProductWidget.scss';

type ProductWidgetDataImmutable = {
  id:number;
  type: string;
  amount: number;
  action: string;
}

type ProductWidgetDataMutable = {
  active: boolean;
  linked: boolean;
  selectedColor: string;
}

export type Props = ProductWidgetDataImmutable & ProductWidgetDataMutable & {
  onToggleActive?:(id:number) => void;
}

type State = Omit<ProductWidgetDataMutable, 'active'>;

export class ProductWidget extends React.Component<Props,State> {

  constructor (props:Props){
    super(props);
    this.state = {...this.props}
  }

  render() {
    return (
      <div className="ProductWidget_root">
        <div className={classNames("ProductWidget_header", this.state.selectedColor)}>  
          <div className="ProductWidget_headerLogoBox">
            <div 
                className={classNames("ProductWidget_headerLogo", getContrastColor(this.state.selectedColor))}
                style={{backgroundImage: 'url(https://assets-global.website-files.com/611391a1477389e3857d8014/612cc6a73d28e6d09ffa3722_LEAVE%20ICON.svg)'}}
            />
            <div className={classNames("ProductWidget_headerLogoText", getContrastColor(this.state.selectedColor))}>
              greenspark
            </div>
          </div>
          <div className={classNames("ProductWidget_headerLabels", getContrastColor(this.state.selectedColor))}>
            <h3>
              {formatAction(this.props.action)}
            </h3>
            <h2>
              {formatType(this.props.type, this.props.amount)}
            </h2>
          </div>
        </div>
        <div className="ProductWidget_row">
          <div className="ProductWidget_subRow">
            <p>
              Link to Public Profile
            </p>
            <Tooltip/>
          </div>
          <CheckBox
            isSelected={this.state.linked}
            onSelect={this.onSelectLink}
          />
        </div>
        <div className="ProductWidget_row">
          <p>
            Badge colour
          </p>
          <div className="ProductWidget_subRow">
            {ALL_COLORS.map((value:string, index: number) =>{
              return (
                <ColorButton
                  key={index}
                  color={value}
                  isSelected={value == this.state.selectedColor}
                  onSelect={this.onSelectColor}
                />
              )
            })}
          </div>
        </div>
        <div className="ProductWidget_row">
          <p>
            Activate badge
          </p>
          <Toggle
            isSelected={this.props.active}
            onSelect={this.onSelectActivate}
          />
        </div>
      </div>
    );
  }

  private onSelectColor = (color:string) =>{
    this.setState({selectedColor: color});
  }

  private onSelectActivate = () =>{
    this.props.onToggleActive?.(this.props.id);
  }

  private onSelectLink = () =>{
    this.setState({linked: !this.state.linked});
  }
}
