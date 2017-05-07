import React from 'react'
import {
	shallow
} from 'enzyme'
import Remaining from '../../main/js/components/remaining'
import IconButton from 'material-ui/IconButton';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvReplay from 'material-ui/svg-icons/av/replay.js';
import SingleTimerDirector from '../../main/js/core/SingleTimerDirector'

function setup() {
	const wrapper = shallow( < Remaining /> )

	return wrapper;
}

describe('components', () => {
	describe('Remaining', () => {
		it('should render AvPlayArrow when state.started is false', () => {
			const wrapper = setup();
			wrapper.setState({
				started: false
			});
			expect(wrapper.find('AvPlayArrow').length).toBe(1);
		});
		it('should not render AvPlayArrow when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvPlayArrow').length).toBe(0);
		});

		it('should not render AvPause when state.started is false', () => {
			const wrapper = setup();
			wrapper.setState({
				started: false
			});
			expect(wrapper.find('AvPause').length).toBe(0);
		});
		it('should render AvPause when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvPause').length).toBe(1);
		});


		it('should render AvReplay when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvReplay').length).toBe(1);
		});
		it('should render AvReplay when state.started is true', () => {
			const wrapper = setup();
			wrapper.setState({
				started: true
			});
			expect(wrapper.find('AvReplay').length).toBe(1);
		});


		it('should render #remainingTime of 00:10:05 when state.remainingMilliseconds is 605000', () => {
			const wrapper = setup();
			wrapper.setState({
				remainingMilliseconds: 605000
			});
			expect(wrapper.find('#remainingTime').text()).toBe("00:10:05");
		});
		it('should render #remainingTime of 00:00:00 when state.remainingMilliseconds is 0', () => {
			const wrapper = setup();
			wrapper.setState({
				remainingMilliseconds: 0
			});
			expect(wrapper.find('#remainingTime').text()).toBe("00:00:00");
		});

		it('should have props.timer equal a default SingleTimerDirector', ()=>{
			const wrapper = <Remaining />;
			expect(wrapper.props.timer).toBeDefined();
			expect(wrapper.props.timer).toBeInstanceOf(SingleTimerDirector);
		});

		describe('start', ()=> {
			it('should set state.started to true', ()=> {
				const wrapper = setup();
				wrapper.setState({started: false});
				wrapper.instance().start();
				expect(wrapper.state().started).toBe(true);
			});
			if('should set state.remainingMilliseconds to state.allottedMilliseconds', ()=> {
				const wrapper = setup(),
					allottedMilliseconds = 3253;
				wrapper.setState({started: false, 
					allottedMilliseconds:allottedMilliseconds});
				wrapper.instance().start();
				expect(wrapper.state().allottedMilliseconds)
					.toBe(allottedMilliseconds);
			});
			it('should call props.timer.startNew with state.allottedMilliseconds', ()=> {
				const allottedMilliseconds = 90210;
				var shouldBeCalled = jest.fn();
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:shouldBeCalled
					}
				};
				const remaining = shallow(<Remaining timer={props.timer}/>);
				remaining.setState({
					allottedMilliseconds:allottedMilliseconds
				});
				remaining.instance().start();
				expect(shouldBeCalled)
					.toHaveBeenCalledWith(expect.any(Function), allottedMilliseconds);
			});
			it('should pass props.onFinished to startNew as callback', ()=> {const allottedMilliseconds = 90210;
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					},
					onFinished:jest.fn()
				};
				const remaining = shallow(<Remaining {...props}/>);
				remaining.setState({
					allottedMilliseconds:allottedMilliseconds
				});
				remaining.instance().start();
				expect(props.timer.startNew)
					.toHaveBeenCalledWith(props.onFinished, allottedMilliseconds);
			});
		});
		describe('tick', ()=> {
			it('should set state.remainingMilliseconds to the passed parameter value', ()=> {
				const remaining = shallow(<Remaining/>),
					expected = 12345;
				remaining.instance().tick(expected);
				expect(remaining.state().remainingMilliseconds).toBe(expected);
			});
		});

		describe('pause', ()=> {
			it('should set state.started to false', ()=> {
				const wrapper = setup()
				wrapper.setState({started: true});
				wrapper.instance().pause()
				expect(wrapper.state().started).toBe(false);
			});

			it('should call timer.stopActive', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> );
				wrapper.instance().pause();
				expect(props.timer.stopActive).toHaveBeenCalled();
			});
		});

		describe('restart', ()=> {
			it('should set state.remainingMilliseconds to state.allottedMilliseconds', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> ),
					allottedMilliseconds = 65000;
				wrapper.setState({allottedMilliseconds: allottedMilliseconds
					, remainingMilliseconds: 0});
				wrapper.instance().restart();
				expect(wrapper.state().remainingMilliseconds).toBe(allottedMilliseconds);
			});
			it('should call timer.startNew()', ()=> {
				var props = {
					timer:{
						stopActive:jest.fn(),
						startNew:jest.fn()
					}
				};
				const wrapper = shallow( < Remaining timer={props.timer} /> );
				wrapper.instance().restart();
				expect(props.timer.startNew).toHaveBeenCalled();
			});
		});
	})
})