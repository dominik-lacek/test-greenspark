import classNames from 'classnames';
import React from 'react';
import './Tooltip.scss';
import { createPortal } from 'react-dom';

type Props = {
    onHover?:() =>void;
}

type State ={
    isHovered:boolean;
    parentRef: HTMLDivElement | null,
    tooltipRef: HTMLDivElement | null,
}

export class Tooltip extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state = {
            isHovered: false,
            parentRef: null,
            tooltipRef: null,
        };
    }

    render() {
        return (
            <div 
                className={classNames("Tooltip_root", {'isHovered': this.state.isHovered})}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                ref={this.onGetParentRef}
            >
                <div className={classNames("Tooltip_i", {'isHovered': this.state.isHovered})}>
                    i
                </div>
                {createPortal(
                    <div 
                        className={classNames("Tooltip_content", {'isHovered': this.state.isHovered})}
                        ref={this.onGetTooltipRef}
                        style={this.getTooltipPosition()}
                        onMouseLeave={this.onMouseLeave}
                    >
                        <p className='Tooltip_text'>
                            This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.
                        </p>
                        <a>
                            View Public Profile
                        </a>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    private onMouseEnter = () =>{
        this.setState({isHovered: true});
    }

    private onMouseLeave = () =>{
        this.setState({isHovered: false});
    }

    private onGetParentRef = (element: HTMLDivElement) =>{
        this.setState({parentRef: element});
    }

    private onGetTooltipRef = (element: HTMLDivElement) =>{
        this.setState({tooltipRef: element});
    }

    private getTooltipPosition = ():React.CSSProperties | undefined =>{
        if (this.state.parentRef == null || this.state.tooltipRef == null){
            return undefined;
        }
        const parentRect = this.state.parentRef.getBoundingClientRect();
        const tooltipRect = this.state.tooltipRef.getBoundingClientRect();

        let x = window.scrollX + parentRect.x + (parentRect.width/2);
        let y = window.scrollY + parentRect.y + (parentRect.height/2);
        if (x + tooltipRect.width > window.innerWidth){
            x = x -tooltipRect.width - (parentRect.width/4);
        }
        if (x < 0){
            x = 0;
        }
        if (y + tooltipRect.height > window.innerHeight){
            y = y - tooltipRect.height - (parentRect.height/4);
        }
        if (y < 0){
            y = 0;
        }
        return {left: x, top: y};
    }
}
