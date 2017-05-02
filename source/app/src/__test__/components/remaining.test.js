import React from 'react'
import {
	shallow
} from 'enzyme'
import Remaining from '../../main/js/components/remaining'
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';

function setup() {
	const enzymeWrapper = shallow( < Remaining / > )

	return enzymeWrapper;
}

describe('components', () => {
	describe('Remaining', () => {
		it('should render AvPlayArrow when state.started is false', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: false
			});
			expect(enzymeWrapper.find('AvPlayArrow').length).toBe(1);
		});
		it('should not render AvPlayArrow when state.started is true', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: true
			});
			expect(enzymeWrapper.find('AvPlayArrow').length).toBe(0);
		});


		it('should not render AvPause when state.started is false', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: false
			});
			expect(enzymeWrapper.find('AvPause').length).toBe(0);
		});
		it('should render AvPause when state.started is true', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: true
			});
			expect(enzymeWrapper.find('AvPause').length).toBe(1);
		});


		it('should render AvReplay when state.started is true', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: true
			});
			expect(enzymeWrapper.find('AvReplay').length).toBe(1);
		});
		it('should render AvReplay when state.started is true', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				started: true
			});
			expect(enzymeWrapper.find('AvReplay').length).toBe(1);
		});


		it('should render #remainingTime containing 33:21 when state.formattedTime is 33:21', () => {
			const enzymeWrapper = setup();
			enzymeWrapper.setState({
				formattedTime: "33:21"
			});
			expect(enzymeWrapper.find('#remainingTime').text()).toBe("33:21");
		});
	})
})