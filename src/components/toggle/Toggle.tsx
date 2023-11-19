import classNames from 'classnames';
import React from 'react';
import './Toggle.scss';

type Props = {
    isSelected:boolean;
    onSelect?:() =>void;
}

type State ={
    isHovered:boolean;
}

export class Toggle extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state = {isHovered: false};
    }

    render() {
        const modifiers = classNames({'isSelected': this.props.isSelected}, {'isHovered': this.state.isHovered})
        return (
            <div 
                className={classNames("Toggle_root", modifiers)}
                onClick={this.props.onSelect}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div className={classNames("Toggle_fill", modifiers)}>
                    <div className="Toggle_centerPoint">
                        <div className={classNames("Toggle_hoverAura",  modifiers)}/>
                        <div className={classNames("Toggle_knob",  modifiers)}/>
                    </div>       
                </div>
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
