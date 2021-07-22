import React, {PureComponent} from 'react'

import {persentColor} from 'functions'

class DailyDetailSuccess extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			types: [
				{label: 'Пожертвования', id: 'donate'},
				{label: 'Записки',       id: 'prayers'},
				{label: 'Кирпичи',       id: 'bricks'},
			]
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
					{this.props.data.map((elem, i) => {
						let percent = (elem.success / elem.processed *100).toFixed(2)

						return (
							<div key={elem.id} className="daily__detail__success__item">
								<h3 className="title">{this.state.types.find(item => item.id === elem.id).label}</h3>
								<div className="daily__detail__success__value">{elem.success} / {elem.processed}</div>
								<div className={"daily__detail__success__percent "+persentColor(percent, colors)}>{percent}%</div>
							</div>
						)
					})}
				</div>
			</div>
		)	
	}

}

export default DailyDetailSuccess