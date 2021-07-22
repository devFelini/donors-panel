import React, {Component} from 'react'

import {getWeekDay, getMonthLabel, FormatedPrice, persentColor, buildGETString, TimestampToDate} from 'functions'

class DailyItem extends Component {
	constructor(props) {
		super(props)

		this.updateItemData = this.updateItemData.bind(this)
		this.getItemData    = this.getItemData.bind(this)

		this.state = {
			loading: false,
		}
	}

	updateItemData() {
		if(!this.state.loading) {
			this.setState({
				loading: true
			})

			this.getItemData()
		}
	}

	getItemData() {
		let respons = buildGETString('get_daily_stat_item', {
			date   : TimestampToDate(this.props.date, '-'),
			update : true
		})
	
		console.log(respons);

		fetch(respons)
			.then(resp => {return resp.json()})
			.then(resBody => {
				this.setState({
					loading: false,
				})

				this.props.setItemData(resBody);
			})
	}

	render() {
		let date_class = ''
		if(this.props.date.getDay() == 0 || this.props.date.getDay() == 6) {
			date_class = 'red'
		}
		
		let colors = [
			{color: 'red',    range: [0,50]}, 
			{color: 'yellow', range: [50,60]}, 
			{color: 'green',  range: [70,101]}, 
		]

		let donate_class  = persentColor(this.props.data.donate.percent, colors)
		let prayers_class = persentColor(this.props.data.prayers.percent, colors)
		let bricks_class  = persentColor(this.props.data.bricks.percent, colors)

		
		let total = FormatedPrice(Number(this.props.data.donate.summ) + Number(this.props.data.prayers.summ) + Number(this.props.data.bricks.summ))


		let updete_btn_class = ''
		if(this.state.loading) {
			updete_btn_class = 'loading'
		}

		return (
			<div className="daily__item item" data-month={this.props.date.getMonth()} data-year={this.props.date.getFullYear()} >
				<div className="daily__item__link" onClick={(e) => this.props.setMode('detail',this.props.date.valueOf())}></div>
				<div className="daily__item__head">
					<div className="daily__item__day">
						<div className={"daily__item__date "+date_class}>{this.props.date.getDate()+' '+getMonthLabel(this.props.date.getMonth(), 2)}</div>
						<div className="daily__item__weekday">{getWeekDay(this.props.date.getDay())}</div>
					</div>
					<div className="daily__short-stat">
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
								<span className="daily__short-stat__price">{FormatedPrice(this.props.data.donate.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.donate.count} шт)</span>  
								<span className={"daily__short-stat__percent "+donate_class}>{this.props.data.donate.percent}%</span>
							</div>
						</div>	
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
								<span className="daily__short-stat__price">{FormatedPrice(this.props.data.prayers.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.prayers.count} шт)</span>  
								<span className={"daily__short-stat__percent "+prayers_class}>{this.props.data.prayers.percent}%</span>
							</div>
						</div>	
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
							<span className="daily__short-stat__price">{FormatedPrice(this.props.data.bricks.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.bricks.count} шт)</span>  
								<span className={"daily__short-stat__percent "+bricks_class}>{this.props.data.bricks.percent}%</span>
							</div>
						</div>	
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
								<span className="daily__short-stat__price">{total}p</span>
							</div>
						</div>	
					</div>	
					<div className="actions">
						<button className={"actions__btn actions__update "+updete_btn_class} onClick={(e) => this.updateItemData()}>
							<div className="icon_update"></div>
						</button>
					</div>
				</div>
			</div>		
		)	
	}

}

export default DailyItem