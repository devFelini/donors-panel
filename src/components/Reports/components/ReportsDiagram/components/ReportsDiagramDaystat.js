import React, {Component, PureComponent} from 'react'

import {FormatedDate, FormatedPrice} from 'functions.js';

class ReportsDiagramDaystat extends PureComponent {

	constructor(props) {
		super(props)

		this.infoBuilder = this.infoBuilder.bind(this);
		this.showInfoList = this.showInfoList.bind(this);

		this.state = {
			data: [
				{id: 'donate',  label: 'Пожертвования', color: '#2F6E4A'},
				{id: 'prayers', label: 'Записки', color: '#F8DE04',},
				{id: 'bricks',  label: 'Кирпичи', color: '#4E1DCC',}
			]
		}
	}

	infoBuilder() {
		let unit = ' руб.'
		if(this.props.info == 'count') {
			unit = ' шт.'
		} 

		let result = []
		if(this.props.types.length > 1) {
			let total = 0
			this.state.data.map((elem, i) => { 
				if(this.props.types.find(item => item == elem.id)) {
					let value = this.props.data.reduce(function(prev, curr) { return prev + Number(curr[elem.id+"_"+this.props.status])}.bind(this), 0)

					result.push({label: elem.label, value: FormatedPrice(value)+unit, color: elem.color})
					total += value
				}
			})

			result.push({label: "Всего", value: FormatedPrice(total)+unit, color: ''})
		} else {
			this.state.data.map((elem, i) => { 
				if(this.props.types.find(item  => item == elem.id)) {
					let value = 0;

					value = this.props.data.reduce(function(prev, curr) { return prev + Number(curr[elem.id+"_p"])}.bind(this), 0)
					result.push({label: "Все",       value: FormatedPrice(value)+unit, color: ''})

					value = this.props.data.reduce(function(prev, curr) { return prev + Number(curr[elem.id+"_s"])}.bind(this), 0)
					result.push({label: "Успешные",  value: FormatedPrice(value)+unit, color: elem.color})

					value = this.props.data.reduce(function(prev, curr) { return prev + Number(curr[elem.id+"_e"])}.bind(this), 0)
					result.push({label: "Ошибочные", value: FormatedPrice(value)+unit, color: '#EF4545'})
				}
			})
		}

		return result;
	}

	showInfoList() {
		if(this.props.data.length > 0) {
			let info = this.infoBuilder()

			return (
				<ul className="reports__diagram__day-stat__info">
					{info.map((elem, i) => {
						return ( 
							<li style={{color: elem.color}}><span>{elem.label}: </span><span>{elem.value}</span></li>
						)
					})}
				</ul>
			)
		} else {
			return ''
		}
	}

	render() {
		let date = FormatedDate(this.props.date/1000, false)

		return ( 
			<div className="reports__diagram__day-stat">
				<div className="reports__diagram__day-stat__head">{date}</div>
				{this.showInfoList()}
			</div>
		)	
	}
}

export default ReportsDiagramDaystat