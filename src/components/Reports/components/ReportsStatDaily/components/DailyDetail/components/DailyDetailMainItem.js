import React, {Component} from 'react'
import {PieChart, Pie, Cell} from 'recharts'

import {TimestampToDate, FormatedPrice, buildGETString} from 'functions'

class DailyDetailMainItem extends Component {
	constructor(props) {
		super(props)

		this.processingData = this.processingData.bind(this)

		this.state = {
			date: new Date(this.props.date),
			data: {},
			types: [
				{name: "Пожертвования", id: "donate",  color: "#2F6E4A", className: "green"},
				{name: "Записки",       id: "prayers", color: "#F8DE04", className: "yellow"},
				{name: "Кирпичи",       id: "bricks",  color: "#4E1DCC", className: "purple"}
			],
			total: 0,
		}
	}

	getData() {
		let params = {
			type  : this.props.info,
			start : TimestampToDate(this.state.date),
			end   : TimestampToDate(this.state.date),
			day   : true
		}
		
		let respons = buildGETString('get_diagram_stat', params)
		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => { 
			this.processingData(resBody)
		})
	}

	processingData(data) {
		if(data.length > 0) {
			data = data[0]
		}

		let types = this.state.types.slice()
		let total = 0

		types.map((elem, i) => {  
			let value = 0
			if(typeof data === 'object' && data.hasOwnProperty(elem.id+"_s")) {
				value = Number(data[elem.id+"_s"])
			}

			types[i].value = value
			total += value
		})

		types.map((elem, i) => {  
			let percent = (elem.value / total * 100).toFixed(2)

			if(percent < 10) {
				percent = '0'+percent
			}

			types[i].percent = percent
		})

		this.setState({
			types: types,
			data: data,
			total: total,
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
			<div className="daily__detail__main__item">
				<div className="daily__detail__main__diagram">
					<PieChart width={160} height={160}>
						<defs>
							<radialGradient id="RadialGradient" cx="0.5" cy="0.5">
								<stop offset="35%" stop-color="rgba(255,255,255,.5)"/>
								<stop offset="80%" stop-color="rgba(255,255,255,.25)"/>
								<stop offset="100%" stop-color="rgba(255,255,255,.15)"/>
							</radialGradient>
						</defs>
						<Pie data={this.state.types} cx="50%" cy="50%" outerRadius={80} innerRadius={30} label={false}>
							{this.state.types.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2}/>
							))}
						</Pie>
						<rect x="0" y="0" rx="80" ry="80" width="160" height="160" fill="url(#RadialGradient)"/>
					</PieChart>
				</div>
				<div className="daily__detail__main__info">
					<h4 className="title">{this.props.title}:</h4>
					<ul>
						{this.state.types.map((elem, i) => { 
							if(!elem.value) {
								elem.value = 0;
							}

							return (
								<li>
									<span className="daily__detail__main__info__label">{elem.name}:</span>
									<span className={"daily__detail__main__info__value "+elem.className}>{FormatedPrice(elem.value)} {this.props.unit} ({elem.percent}%)</span>
								</li>
							)
						})}
						<li className="daily__detail__main__info__total">
							<span className="daily__detail__main__info__label">Всего:</span>
							<span className="daily__detail__main__info__value">{FormatedPrice(this.state.total)} {this.props.unit}</span>
						</li>
					</ul>
				</div>
			</div>
		)	
	}

}

export default DailyDetailMainItem