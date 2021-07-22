import React, {Component} from 'react'

import ReportsDiagramVisual       from './components/ReportsDiagramVisual'
import ReportsDiagramSelectInfo   from './components/ReportsDiagramSelectInfo'
import ReportsDiagramSelectPeriod from './components/ReportsDiagramSelectPeriod'
import ReportsDiagramSelectDonate from './components/ReportsDiagramSelectDonate'
import ReportsDiagramSelectStatus from './components/ReportsDiagramSelectStatus'
import ReportsDiagramDaystat      from './components/ReportsDiagramDaystat'

import ReportsDiagramUpdate from './components/ReportsDiagramUpdate'

import {TimestampToDate, buildGETString} from 'functions.js';

class ReportsDiagram extends Component {

	constructor(props) {
		super(props)

		this.changeInfo = this.changeInfo.bind(this)
		this.changePeriod = this.changePeriod.bind(this)
		this.changeTypes = this.changeTypes.bind(this)
		this.setUpdateMode = this.setUpdateMode.bind(this)
		this.changeStatus = this.changeStatus.bind(this)
		this.showStatusSelector = this.showStatusSelector.bind(this)
		this.showDayStat = this.showDayStat.bind(this)
		this.showHead = this.showHead.bind(this)

		let date_end = new Date();

		date_end.setHours(0, 0, 0, 0); 

		let date_start = new Date(date_end.valueOf() - ((24 * 60 * 60 * 1000) * 7));

		this.state = {
			info: 'count',
			types: ['donate', 'prayers', 'bricks'],
			period: {
				start: date_start,
				end: date_end,
			},
			donate_status: 's',
			data: [],
			loading: false,
			updateData: false,
		}
	}


	getData(update) {
		this.setState({ loading: true });

		let respons = buildGETString('get_diagram_stat', {
			type   : this.state.info,
			start  : TimestampToDate(this.state.period.start,'-'),
			end    : TimestampToDate(this.state.period.end,'-'),
			update : update
		})
	
		console.log(respons);

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {

			this.setState({
				data: resBody,
				loading: false,
				updateData: false,
			})
		})
	}

	changeInfo(value) {
		this.setState({
			info: value,
		})
	}

	changeStatus(value) {
		this.setState({
			donate_status: value,
		})
	}

	changePeriod(value) {
		let state = {
			period: {
				start: value[0],
				end: value[1], 
			}
		}

		if(value[0].getTime() == value[1].getTime()) {
			state.info = 'count';
		}

		this.setState(state)
	}

	setUpdateMode() {
		this.setState({
			updateData: true
		})

		this.getData(true)
	}

	changeTypes(value) {
		this.setState({
			types: value
		})
	}

	showStatusSelector() {
		if(this.state.types.length > 1) {
			return (
				<ReportsDiagramSelectStatus status={this.state.donate_status} changeStatus={this.changeStatus}/>
			)
		} else {
			return ''
		}
	}

	showDayStat() {
		if(this.state.period.start.getTime() == this.state.period.end.getTime()) {
			return (
				<ReportsDiagramDaystat date={this.state.period.start.getTime()} data={this.state.data} data={this.state.data} info={this.state.info} types={this.state.types} status={this.state.donate_status} donate_status={this.state.donate_status}/>
			)
		} else {
			return ''
		}
	}

	showHead() {
		if(this.props.hide_head != true) {
			return (
				<div className="reports__diagram__head">
					<div className="reports__diagram__head__left"></div>
					<div className="reports__diagram__head__right">
						<ReportsDiagramSelectPeriod start={this.state.period.start} end={this.state.period.end} changePeriod={this.changePeriod} />
					</div>
					{this.showDayStat()}
					<ReportsDiagramUpdate loading={this.state.loading} update={this.state.updateData} setUpdateMode={this.setUpdateMode}/>	
				</div>
			)
		}
	}

	componentDidMount() {
		if(this.props.period) {
			this.setState({
				period: {
					start: new Date(this.props.period),
					end: new Date(this.props.period),
				}
			})
		}
		
		this.getData(false)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.period != prevProps.period) {
			this.setState({
				period: {
					start: new Date(this.props.period[0]),
					end: new Date(this.props.period[1]),
				}
			})
		}

		if(prevState.info != this.state.info || prevState.period != this.state.period || this.props.updated) {	
			this.getData(false)
		}
	} 

	render() {

		let is_day = this.state.period.start.getTime() == this.state.period.end.getTime()

		return (
			<div className="reports__diagram">
				{this.showHead()}
				<ReportsDiagramVisual data={this.state.data} info={this.state.info} types={this.state.types} status={this.state.donate_status} donate_status={this.state.donate_status} changePeriod={this.changePeriod}/>
				<div className="reports__diagram__bottom">
					<ReportsDiagramSelectDonate types={this.state.types} changeTypes={this.changeTypes}/>
					{this.showStatusSelector()}
					<ReportsDiagramSelectInfo type={this.state.info} is_day={is_day} changeInfo={this.changeInfo} />
				</div>
			</div>
		)	
	}
}

export default ReportsDiagram