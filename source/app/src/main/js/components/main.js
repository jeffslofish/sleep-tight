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

import Remaining from './remaining'


class Main extends Component {
	render() {
		// Note to self, don't forget to run dev & hot!
		console.log("main.js:render()");
		var s = {
			sleep: true,
			sliderValue: 0.5,
			leftFormattedTime: "60:00",
			started: true
		};
		return(
			<div className="row main">
				<MuiThemeProvider>
					<div style={{width:"90%",margin:"0 auto"}}>
						<div>
							<RaisedButton label="Shut Down" primary={!s.sleep} />
							<RaisedButton label="Sleep" primary={s.sleep} />
						</div>
						<div>
							<Slider value={s.sliderValue} />
						</div>
						<div style={{textAlign:"center"}}>
							<Remaining />
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default Main;
