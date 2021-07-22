import React, {Component} from 'react'
import ReportsDiagram from '../../../ReportsDiagram/index'

import FigureData   from '../../../FigureData'
import TopDonations from '../../../TopDonations'
import Average      from '../../../Average'

import DailyDetailSuccess from './components/DailyDetailSuccess'

import {getMonthLabel, getWeekDay, TimestampToDate, buildGETString} from 'functions'

class DailyDetail extends Component {
	constructor(props) {
		super(props)

		this.changeDate = this.changeDate.bind(this) 
		this.getData    = this.getData.bind(this)

		this.state = {
			date: new Date(this.props.date),
			loading: false,
			updated: false,
			day_data: {}
		}
	}

	changeDate(direction) {
		let next_date = new Date(this.state.date.valueOf() + (24 * 60 * 60 * 1000) * direction)

		this.setState({ 
			date: next_date
		})
	}

	getData(update) {
		if(update) {
			this.setState({ 
				loading: true
			})
		}

		let respons = buildGETString('get_daily_detail_stat', {
			date: TimestampToDate(this.state.date, '-'),
			update: update,
		})
		
		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
		.then(resp    => {return resp.json()})
		.then(resBody => { 
			this.setState({ 
				day_data: resBody,
				loading: false,
				updated: true,
			})
		})
	}

	componentDidMount() {
		this.setState({ 
			date: new Date(this.props.date)
		});

		this.getData(false)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.state.updated) {
			this.setState({
				updated: false,
			})
		}
		if(this.state.date.valueOf() != prevState.date.valueOf()) {
			this.getData(false)
		}
	} 


	render() {
		let date_class = ''
		if(this.state.date.getDay() == 0 || this.state.date.getDay() == 6) {
			date_class = 'red'
		}

		let update_class = ''
		if(this.state.loading) {
			update_class = 'loading'
		}

		let figure_data_count = {
			donate:  Number(this.state.day_data.donate_s_count),
			prayers: Number(this.state.day_data.prayers_s_count),
			bricks:  Number(this.state.day_data.bricks_s_count)
		}

		let figure_data_summ = {
			donate:  Number(this.state.day_data.donate_s_summ),
			prayers: Number(this.state.day_data.prayers_s_summ),
			bricks:  Number(this.state.day_data.bricks_s_summ)
		}

		let success_data = [
			{id: 'donate',  success: Number(this.state.day_data.donate_s_count),  processed: Number(this.state.day_data.donate_p_count)},
			{id: 'prayers', success: Number(this.state.day_data.prayers_s_count), processed: Number(this.state.day_data.prayers_p_count)},
			{id: 'bricks',  success: Number(this.state.day_data.bricks_s_count),  processed: Number(this.state.day_data.bricks_p_count)}
		]

		let average_data = [
			{id: 'donate',  count: Number(this.state.day_data.donate_s_count),  summ: Number(this.state.day_data.donate_s_summ)},
			{id: 'prayers', count: Number(this.state.day_data.prayers_s_count), summ: Number(this.state.day_data.prayers_s_summ)},
			{id: 'bricks',  count: Number(this.state.day_data.bricks_s_count),  summ: Number(this.state.day_data.bricks_s_summ)}
		]
		
		return (
			<div className="daily">
				<div className="daily__detail">
					<div className="content__head">
						<div className="content__head__left">
							<div className="content__head__day">
								<h2 className="title">{this.state.date.getDate()+' '+getMonthLabel(this.state.date.getMonth(), 2)+' '+this.state.date.getFullYear()}</h2>
								<div className={date_class}>{getWeekDay(this.state.date.getDay())}</div>
							</div>
							<div className="daily__detail__nav">
								<button className="daily__detail__nav__arrow prev" onClick={(e) => this.changeDate(-1)} title="Предыдущий день"></button>
								<button className="daily__detail__nav__arrow next" onClick={(e) => this.changeDate(1)}  title="Следующий день"></button>
							</div>
						</div>
						<div className="content__head__buttons">
							<button className={"daily__detail__update btn btn_grey "+update_class} onClick={(e) => this.getData(true)}><span class="icon_update">Актуализировать данные</span></button>
							<button className="btn btn_green" onClick={(e) => this.props.setMode('list',0)}>Закрыть</button>
						</div>
					</div> 
					<div className="daily__detail__wrap">
						<div className="daily__detail__main">
							<FigureData data={figure_data_count} title="Количество" unit="шт."/>
							<FigureData data={figure_data_summ}  title="Cумма"      unit="руб."/>
						</div>
						<ReportsDiagram updated={this.state.updated} hide_head={true} period={[this.state.date.valueOf(), this.state.date.valueOf()]}/>
						<DailyDetailSuccess data={success_data}/>
						<TopDonations updated={this.state.updated} date={this.state.date.valueOf()} period="day"/>
						<Average data={average_data}/>
					</div>							
				</div>
			</div>
		)	
	}

}

export default DailyDetail