import React, {Component} from 'react'

import {TimestampToDate, FormatedPrice, buildGETString} from 'functions'

class TopDonations extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: new Date(this.props.date),
			data: [],
		}
	}

	getData() {
		let period = 'day';
		if(this.props.period) {
			period = this.props.period;
		}

		let respons = buildGETString('get_top_donations', {
			period : period,
			date   : TimestampToDate(this.state.date)
		})

		console.log(respons);

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {
			this.setState({
				data: resBody
			})
		})
	}

	componentDidMount() {
		this.getData()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.date != prevProps.date) {
			this.setState({
				date: new Date(this.props.date)
			})
		}

		if(this.state.date != prevState.date || this.props.updated) {
			this.getData()
		}
	} 

	render() {
		return (		
			<div className="daily__detail__top">
				<div className="daily__detail__top__head">
					<h2 className="title">TОП пожертвований</h2>
				</div>
				<div className="daily__detail__top__list">
					{this.state.data.map((elem, i) => {
						let price_class = ''
						if(Number(elem.price) >= 10000) {
							price_class = 'red'
						}

						return (
							<div key={i} className="daily__detail__top__item">
								<div className={"daily__detail__top__card daily__detail__top__card_"+elem.type}>
									<div className="daily__detail__top__name">{elem.name}</div>
									<div className={"daily__detail__top__price "+price_class}>{FormatedPrice(elem.price)} р</div>
									<div className="daily__detail__top__time">{elem.time}</div>
								</div>
							</div>
						)
					})}
				</div>	
			</div>	
		)	
	}

}

export default TopDonations