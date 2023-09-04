import React, { Component } from 'react'
import './about.css';

class About extends Component {
    constructor(props) {
      super(props);
      
      this.handleInfo = this.handleInfo.bind(this);
    }

    handleInfo() {
        this.props.handleInfoChange(false);
    }

    render() {
        if (window.innerWidth <= 500) {
            return(
                <div>
                    <div className={'m-top-container'}>
                        <div
                            className={'m-back'}
                            onClick={this.handleInfo}
                        />
                        <div
                            className={'m-ordinaments-logo'}
                        />
                        <div className='m-info-container'>
                            <div className={'m-instruction desc'}>Ordinaments are fragments of reality – ordinary objects which are not hard to find. The commonness of ordinaments makes them overlooked and underestimated for residents of the city. But a closer look can reveal their uniqueness.</div>
                            <div className={'m-instruction desc'}>Ordinaments are captured by 3D scanning technology which isolates small fragments from the surroundings, the rest is left to viewer's imagination. The sound completes the atmosphere of the specific moment.</div>
                            <div className={'m-instruction desc'}>Created by Samuel Antol @sam_cyan at VŠVU/AFAD</div>
                        </div>
                    </div>
    
                    <div className={'m-instruction-container'}>
                        <div className={'m-instruction'}>1 highlight category you’re interested in <br/><div className={'desc'}>nature, industrial, street, or waterside</div></div>
                        <div className={'m-instruction'}>2 discover ordinaments on the map <br/><div className={'desc'}><div className={'c c-unknown'}/> is unknown ordinament <br/><div className={'c c-discovered'}/> is discovered ordinament <br/><div className={'c c-highlighted'}/> is highlighted ordinament <br/><div className={'c c-active'}/> is currently open ordinament</div></div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div className={'top-container'}>
                        <div
                            className={'back'}
                            onClick={this.handleInfo}
                        />
                        <div
                            className={'ordinaments-logo'}
                        />
                        <div className={'info-container'}>
                            <div className={'instruction desc'}>Ordinaments are fragments of reality – ordinary objects which are not hard to find. The commonness of ordinaments makes them overlooked and underestimated for residents of the city. But a closer look can reveal their uniqueness.</div>
                            <div className={'instruction desc'}>Ordinaments are captured by 3D scanning technology which isolates small fragments from the surroundings, the rest is left to viewer's imagination. The sound completes the atmosphere of the specific moment.</div>
                            <div className={'instruction desc'}>Created by Samuel Antol @sam_cyan at VŠVU/AFAD</div>
                        </div>
                    </div>
    
                    <div className={'instruction-container'}>
                        <div className={'instruction'}>1 highlight category you’re interested in <br/><div className={'desc'}>nature, industrial, street, or waterside</div></div>
                        <div className={'instruction'}>2 discover ordinaments on the map <br/><div className={'desc'}><div className={'c c-unknown'}/> is unknown ordinament <br/><div className={'c c-discovered'}/> is discovered ordinament <br/><div className={'c c-highlighted'}/> is highlighted ordinament <br/><div className={'c c-active'}/> is currently open ordinament</div></div>
                    </div>
                </div>
            );
        }
    }
}

export default About;