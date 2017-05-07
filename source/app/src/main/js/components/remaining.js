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

import _ from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'; 
injectTapEventPlugin();

class Remaining extends Component {
  constructor(props) {
    super(props);
    this.internalTimer = {
      startNew:(cb,ms)=>{ this.props.timer.startNew(cb,ms); },
      onTick:(ms)=>{
        //this.tick(ms);
        this.props.timer.onTick(ms);
      },
      stopActive:()=>{this.props.timer.stopActive()}
    }
    this.state = {
      allottedMilliseconds:0,
      remainingMilliseconds:0,
      started:false
    };

    this.props.timer.onTick = (ms)=> {
      this.tick(ms);
    };
    
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.renderStateMilliseconds = this.renderStateMilliseconds.bind(this);

    console.log("remaining constructor:", props, this.state);
  }
  componentWillReceiveProps(newProps) {
    this.initiateStartFromNewPropsIfNecessary(newProps);
    console.log("remaining.componentWillReceiveProps", newProps, this.state);
  }
  initiateStartFromNewPropsIfNecessary(newProps) {
    var remainingMilliseconds = 0,
      allottedMilliseconds = 0;
    if(newProps.allottedMilliseconds !== undefined
      && newProps.allottedMilliseconds > 0) {
      allottedMilliseconds = newProps.allottedMilliseconds;
      remainingMilliseconds = newProps.allottedMilliseconds;
      this.state = {
        allottedMilliseconds:allottedMilliseconds,
        remainingMilliseconds:remainingMilliseconds
      };
      this.start();
    }
  }
  tick(milliseconds) {
    console.log("remaining.tick", milliseconds);
    this.setState({
      remainingMilliseconds: milliseconds
    });
  }
  start() {
    this.setState({
      remainingMilliseconds: this.state.allottedMilliseconds,
      started: true
    });
    this.internalTimer
      .startNew(this.props.onFinished, this.state.allottedMilliseconds);
  }
  pause() {
    this.setState({
      remainingMilliseconds: this.state.allottedMilliseconds,
      started: false
    });
    this.internalTimer.stopActive()
  }
  restart() {
    this.start();
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
    console.log("remaining.render", this.state)
		return(
      <div>
        <div id="remainingTime">
          {this.renderStateMilliseconds()}
        </div>
        <div>
          {this.state.started ?
          <IconButton id="pause" 
            tooltip="Pause"
            onTouchTap={this.pause}>
            <AvPause />
          </IconButton> :
          <IconButton id="start" tooltip="Start" 
            onTouchTap={this.start}>
            <AvPlayArrow />
          </IconButton>}
          <IconButton id="restart" tooltip="Restart"
            onTouchTap={this.restart}>
            <AvReplay />
          </IconButton>
        </div>
      </div>
		)
	}
}

Remaining.defaultProps = {
  timer:new SingleTimerDirector(),
  onFinished:function() { console.log("default unfinished"); }
};

export default Remaining;
