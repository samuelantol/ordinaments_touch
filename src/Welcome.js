import React, { Component } from 'react';
import './welcome.css';

//import Cursor from './Cursor.js';

class Welcome extends Component {
    constructor(props) {
        super(props);
        
        this.handleIsStart = this.handleIsStart.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
    }

    handleInfo() {
        this.props.handleInfoChange(true);
        this.props.handleIsStartChange(false);
    }

    handleIsStart() {
        this.props.handleIsStartChange(false);
    }

    render() {
        return(
            <div>
                <div className={'background'}/>
                {/* <Cursor /> */}
                <div className={'w-ordinaments-logo'} />
                <div className={'w-instruction-container'}>
                    <div className={'w-instruction'}>1 highlight category you’re interested in (at the top)<br/><div className={'desc'}>nature, industrial, street, or waterside</div></div>
                    <div className={'w-instruction'}>2 discover ordinaments on the map (at the left side) <br/><div className={'desc'}><div className={'c c-unknown'}/> is unknown ordinament <br/><div className={'c c-active'}/> is currently open ordinament</div></div>
                    <div className={'w-instruction'}>3 click <div className={'music'}/> (in the top right corner) to turn on music mode <br/><div className={'desc'}>then play your favourite music on your computer</div></div>
                </div>
                <div
                    className={'start'}
                    onClick={this.handleIsStart}
                />
                <div
                    className={'w-secondary-info'}
                    onClick={this.handleInfo}
                />
            </div>
        );
    }
}

export default Welcome;