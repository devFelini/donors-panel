import React, {Component} from 'react'

import ReportsDiagram from '../../../ReportsDiagram/index'

import TopDonations from '../../../TopDonations'
import FigureData   from '../../../FigureData'
import Average      from '../../../Average'

import {getMonthLabel, TimestampToDate, buildGETString} from 'functions'

class MonthlyDetail extends Component {
	constructor(props) {
		super(props)

		this.changeDate = this.changeDate.bind(this) 

		this.state = {
			date: new Date(this.props.date),
			loading: false,
			updated: false,
			day_data: {}
		}
	}

	changeDate(direction) {
		let next_date = new Date(this.state.date.valueOf())
		next_date.setMonth(next_date.getMonth() + direction, 1);

		this.setState({ 
			date: next_date
		});
	}

	getData(update) {
		if(update) {
			this.setState({ 
				loading: true
			})
		}

		let respons = buildGETString('get_montly_detail_stat', {
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

		let average_data = [
			{id: 'donate',  count: Number(this.state.day_data.donate_s_count),  summ: Number(this.state.day_data.donate_s_summ)},
			{id: 'prayers', count: Number(this.state.day_data.prayers_s_count), summ: Number(this.state.day_data.prayers_s_summ)},
			{id: 'bricks',  count: Number(this.state.day_data.bricks_s_count),  summ: Number(this.state.day_data.bricks_s_summ)}
		]

		let next_month = new Date(this.state.date.valueOf())
		next_month.setMonth(next_month.getMonth() + 1, 0);

		return (
			<div className="daily">
				<div className="daily__detail">
					<div className="content__head">
						<div className="content__head__left">
							<div className="content__head__day">
								<h2 className="title">{getMonthLabel(this.state.date.getMonth(), 1)+' '+this.state.date.getFullYear()}</h2>
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
						<ReportsDiagram updated={this.state.updated} hide_head={true} period={[this.state.date.valueOf(), next_month.valueOf()]}/>
						<TopDonations updated={this.state.updated} date={this.state.date.valueOf()} period="month"/>
						<Average data={average_data}/>
					</div>							
				</div>
			</div>
		)	
	}

}

export default MonthlyDetail