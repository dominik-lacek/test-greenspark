import classNames from 'classnames';
import React from 'react';
import './CheckBox.scss';

type Props = {
    isSelected:boolean;
    onSelect?:() =>void;
}

type State ={
    isHovered:boolean;
}

export class CheckBox extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state = {isHovered: false};
    }

    render() {
        const modifiers = classNames({'isSelected': this.props.isSelected}, {'isHovered': this.state.isHovered})
        return (
            <div 
                className={classNames("CheckBox_root", modifiers)}
                onClick={this.props.onSelect}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div className={classNames("CheckBox_hoverAura",  modifiers)}/>
                <div
                    className={classNames("CheckBox_icon",  modifiers)}
                    style={{backgroundImage: "url(https://static-00.iconduck.com/assets.00/checkmark-icon-512x426-8re0u9li.png)"}}
                />
            </div>
        );
    }

    private onMouseEnter = () =>{
        this.setState({isHovered: true});
    }

    private onMouseLeave = () =>{
        this.setState({isHovered: false});
    }
}
