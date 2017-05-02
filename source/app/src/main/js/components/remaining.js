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

class Remaining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedTime:"60:00"
    };
  }
	render() {
		return(
      <div>
        <div id="remainingTime">
          {this.state.formattedTime}
        </div>
        <div>
          {this.state.started ?
          <IconButton tooltip="Pause" visible={this.state.started}>
            <AvPause />
          </IconButton> :
          <IconButton tooltip="Start" visible={!this.state.started}>
            <AvPlayArrow />
          </IconButton>}
          <IconButton tooltip="Restart">
            <AvReplay />
          </IconButton>
        </div>
      </div>
		)
	}
}

export default Remaining;
