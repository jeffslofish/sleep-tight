import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';

import SingleTimerDirector from '../core/SingleTimerDirector.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import _ from 'lodash'

class Remaining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedTime:"60:00",
      allottedMilliseconds:3600,
      
      
      remainingMilliseconds:0
    };
    this.internalTimer = {
      startNew:(cb,ms)=>{ this.props.timer.startNew(cb,ms); },
      onTick:(ms)=>{
        this.tick(ms);
        this.props.timer.onTick(ms);
      },
      stopActive:()=>{this.props.timer.stopActive()}
    }
    injectTapEventPlugin();
  }
  tick(milliseconds) {
    this.state.remainingMilliseconds = milliseconds;
  }
  start() {
    this.state.remainingMilliseconds = this.state.allottedMilliseconds;
    this.internalTimer
      .startNew(()=>{}, this.state.allottedMilliseconds);
    this.state.started = true;
  }
  parsePad(i) {
    return _.padStart(parseInt(i), 2, "0");
  }
  renderMilliseconds(milliseconds) {
    var seconds=this.parsePad(((milliseconds/1000)%60));
    var minutes=this.parsePad(((milliseconds/(1000*60))%60));
    var hours=this.parsePad((milliseconds/(1000*60*60))%24);
    return `${hours}:${minutes}:${seconds}`;
  }
  renderStateMilliseconds() {
    return this.renderMilliseconds(this.state.remainingMilliseconds);
  }
	render() {
		return(
      <div>
        <div id="remainingTime">
          {this.renderStateMilliseconds()}
        </div>
        <div>
          {this.state.started ?
          <IconButton id="pause" 
            tooltip="Pause">
            <AvPause />
          </IconButton> :
          <IconButton id="start" tooltip="Start" 
            onTouchTap={this.start()}>
            <AvPlayArrow />
          </IconButton>}
          <IconButton id="restart" tooltip="Restart">
            <AvReplay />
          </IconButton>
        </div>
      </div>
		)
	}
}

Remaining.defaultProps = {
  timer:new SingleTimerDirector()
};

export default Remaining;
