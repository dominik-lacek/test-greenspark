import classNames from 'classnames';
import React from 'react';
import './ColorButton.scss';

type Props = {
    color: string;
    isSelected:boolean;
    onSelect?:(color:string) =>void;
}

export class ColorButton extends React.Component<Props,{}> {
  render() {
    return (
        <input
            type="button" 
            className={classNames("ColorButton_root", this.props.color, {'isSelected': this.props.isSelected})}
            onClick={this.onSelect}
        />
    );
  }

  private onSelect = () =>{
    this.props.onSelect?.(this.props.color);
  }
}
