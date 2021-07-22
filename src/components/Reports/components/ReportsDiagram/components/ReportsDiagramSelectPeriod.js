import React, {Component, PureComponent} from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import {getMonthLabel} from 'functions.js';

class ReportsDiagramSelectPeriod extends PureComponent {

	constructor(props) {
		super(props)

		this.setPeriod = this.setPeriod.bind(this);
		this.getDayButtons = this.getDayButtons.bind(this);

		this.state = {
			default: [],
			value: [],
			day_btns: [],
			period_btns: [],
		}
	}


	componentDidMount() {

		// Data Build
		let data = [];

		let today = new Date();
		today.setHours(0, 0, 0, 0);  
		let start_week = new Date(today.valueOf() - ((24 * 60 * 60 * 1000) * 7));

		data.push({id: 'week', label: 'Неделя', start: start_week, end: today});

		let curr_mont_start = new Date();

		curr_mont_start.setDate(1);
		
		today = new Date();
		today.setHours(0, 0, 0, 0); 
		data.push({id: 'curr_month', label: getMonthLabel(curr_mont_start.getMonth()), start: curr_mont_start, end: today});

		let prev_mont_start = new Date();
		prev_mont_start.setMonth(curr_mont_start.getMonth()-1);
		prev_mont_start.setDate(1);

		let prev_mont_end = new Date();
		prev_mont_end.setDate(curr_mont_start.getDate()-1);

		data.push({id: 'prev_month', label: getMonthLabel(prev_mont_start.getMonth()), start: prev_mont_start, end: prev_mont_end});

		// Set State

		this.setState({
			default:     [this.props.start, this.props.end],
			value:       [this.props.start, this.props.end],
			period_btns: data,
			day_btns:    this.getDayButtons()
		})

	} 

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.start != this.props.start || prevProps.end != this.props.end) {
			this.setState({
				value: [this.props.start, this.props.end],
				day_btns: this.getDayButtons()
			})
		}

	}

	getDayButtons() {
		let data = []

		if(this.props.start.getTime() == this.props.end.getTime()) {
			let prev_day = new Date(this.props.start.valueOf() - (24 * 60 * 60 * 1000))
			data.push({id: 'prev_day', label: 'Предыдущий день', start: prev_day, end: prev_day})

			let next_day = new Date(this.props.start.valueOf() + (24 * 60 * 60 * 1000))
			data.push({id: 'next_day', label: 'Следующий день',  start: next_day, end: next_day})	
		} else {
			let today = new Date()
			today.setHours(0, 0, 0, 0)
			data.push({id: 'today', label: 'Сегодня', start: today, end: today})

			let yesterday = new Date(today.valueOf() - (24 * 60 * 60 * 1000))
			data.push({id: 'yesterday', label: 'Вчера', start: yesterday, end: yesterday})
		}

		return data
	}

	setPeriod(value) {
		if(value == null) {
			value = this.state.default
		}

		value[0].setHours(0, 0, 0, 0)
		value[1].setHours(0, 0, 0, 0)

		this.props.changePeriod(value)
	}

	render() {
		return ( 
			<div className="reports__diagram__period">
				<ul className="reports__diagram__period__list">
					{this.state.day_btns.map((elem, i) => { 
						let state = ''
						if(this.props.start.getTime() == elem.start.getTime() && this.props.end.getTime() == elem.end.getTime()) {
							state = 'active'
						}

						return (
							<li key={elem.id}><button className={"reports__diagram__period__btn "+state} onClick={(e) => this.setPeriod([elem.start, elem.end])}>{elem.label}</button></li>
						)
					})}
					{this.state.period_btns.map((elem, i) => { 
						let state = ''
						if(this.props.start.getTime() == elem.start.getTime() && this.props.end.getTime() == elem.end.getTime()) {
							state = 'active'
						}

						return (
							<li key={elem.id}><button className={"reports__diagram__period__btn "+state} onClick={(e) => this.setPeriod([elem.start, elem.end])}>{elem.label}</button></li>
						)
					})}
					<li><DateRangePicker value={this.state.value} clearIcon={null} onChange={(e) => this.setPeriod(e)} /></li>
				</ul>
			</div>	
		)	
	}
}

export default ReportsDiagramSelectPeriod