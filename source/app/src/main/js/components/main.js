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
import Chooser from './chooser'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMilliseconds: 3600000
    };
		this.handleOnChosen = this.handleOnChosen.bind(this);
  }
	render() {
		// Note to self, don't forget to run dev & hot!
		console.log("main.js:render()", this.state);
		var s = {
			sleep: true,
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
							<Chooser onChosen={this.handleOnChosen} />
						</div>
						<div style={{textAlign:"center"}}>
							<Remaining allottedMilliseconds={this.state.chosenMilliseconds} />
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}

	handleOnChosen(chosenMilliseconds) {
		this.setState({chosenMilliseconds:chosenMilliseconds});
		console.log("onChosen handled", this.state);
	}
}

export default Main;
