import React, {PureComponent} from 'react'
import {PieChart, Pie, Cell} from 'recharts'

import {FormatedPrice} from 'functions'

class FigureData extends PureComponent {
	constructor(props) {
		super(props)

		this.processingData = this.processingData.bind(this)

		this.state = {
			types: [
				{name: "Пожертвования", id: "donate",  color: "#2F6E4A", className: "green"},
				{name: "Записки",       id: "prayers", color: "#F8DE04", className: "yellow"},
				{name: "Кирпичи",       id: "bricks",  color: "#4E1DCC", className: "purple"}
			],
			total: 0,
		}
	}

	processingData() {
		let types = this.state.types.slice()
		let total = 0

		types.map((elem, i) => {  
			let value = this.props.data[elem.id]

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
			total: total,
		})
	}

	componentDidMount() {
		this.processingData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.data != prevProps.data) {
			this.processingData();
		}
	} 

	render() {
		return (		
			<div className="daily__detail__main__item">
				<div className="daily__detail__main__diagram">
					<PieChart width={160} height={160}>
						<defs>
							<radialGradient id="RadialGradient" cx="0.5" cy="0.5">
								<stop offset="35%"  stopColor="rgba(255,255,255,.5)"/>
								<stop offset="80%"  stopColor="rgba(255,255,255,.25)"/>
								<stop offset="100%" stopColor="rgba(255,255,255,.15)"/>
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

export default FigureData