import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Slider from 'material-ui/Slider';

import _ from 'lodash'

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxMilliseconds: 7200000
    };
  }
	render() {
		return(
      <div>
        <Slider 
          min={0}
          max={this.state.maxMilliseconds}
          step={1000}
          value={this.state.chosenMilliseconds}
          onChanged={this.triggerChange()}
         />
      </div>
		)
	}
  triggerChange(event, newValue) {
    if(!this.props.onChosen) return;
    this.props.onChosen(newValue);
  }
}

export default Chooser;
