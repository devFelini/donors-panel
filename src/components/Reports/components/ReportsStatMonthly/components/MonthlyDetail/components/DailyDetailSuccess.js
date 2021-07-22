import React, {Component, PureComponent} from 'react'

import {TimestampToDate, persentColor} from 'functions'

class DailyDetailSuccess extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: new Date(this.props.date),
			data: [],
			types: [
				{label: 'Пожертвования', id: 'donate'},
				{label: 'Записки',       id: 'prayers'},
				{label: 'Кирпичи',       id: 'bricks'},
			]
		}
	}

	getData() {
		let respons = global.queryAddress+'?action=get_day_success_stat&date='+TimestampToDate(this.state.date)

		console.log(respons);

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {
			console.log(resBody)
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
		let colors = [
			{color: 'red',    range: [0,50]}, 
			{color: 'yellow', range: [50,60]}, 
			{color: 'green',  range: [70,101]}, 
		]
		
		
		return (		
			<div className="daily__detail__success">
				<div className="daily__detail__success__head">
					<h2 className="title">Успешность транзакций</h2>
				</div>
				<div className="daily__detail__success__list">
					{this.state.data.map((elem, i) => {
						return (
							<div key={elem.type} className="daily__detail__success__item">
								<h3 className="title">{this.state.types.find(item => item.id === elem.type).label}</h3>
								<div className="daily__detail__success__value">{elem.count_s} / {elem.count_p}</div>
								<div className={"daily__detail__success__percent "+persentColor(elem.percent, colors)}>{elem.percent}%</div>
							</div>
						)
					})}
				</div>
			</div>
		)	
	}

}

export default DailyDetailSuccess