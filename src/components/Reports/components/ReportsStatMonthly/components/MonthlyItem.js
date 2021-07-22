import React, {Component} from 'react'

import {getMonthLabel, FormatedPrice} from 'functions'

class MonthlyItem extends Component {
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
		let respons = global.queryAddress+'?action=get_monthly_stat_item&date='+this.props.data.date+'&update=true'

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
		let total = FormatedPrice(Number(this.props.data.donate.summ) + Number(this.props.data.prayers.summ) + Number(this.props.data.bricks.summ))

		let updete_btn_class = ''
		if(this.state.loading) {
			updete_btn_class = 'loading'
		}

		return (
			<div className="daily__item item" data-year={this.props.data.year} >
				<div className="daily__item__link" onClick={(e) => this.props.setMode('detail',this.props.date)}></div>
				<div className="daily__item__head">
					<div className="daily__item__day">
						<div className="daily__item__date">{getMonthLabel(Number(this.props.data.month) - 1, 1)}</div>
					</div>
					<div className="daily__short-stat">
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
								<span className="daily__short-stat__price">{FormatedPrice(this.props.data.donate.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.donate.count} шт)</span>  
							</div>
						</div>	
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
								<span className="daily__short-stat__price">{FormatedPrice(this.props.data.prayers.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.prayers.count} шт)</span> 
							</div>
						</div>	
						<div className="daily__short-stat__item">
							<div className="daily__short-stat__content">
							<span className="daily__short-stat__price">{FormatedPrice(this.props.data.bricks.summ)}p</span><br/> 
								<span className="daily__short-stat__count">({this.props.data.bricks.count} шт)</span>  
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

export default MonthlyItem