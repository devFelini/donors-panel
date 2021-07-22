import React, {Component} from 'react'

class Average extends Component {
	constructor(props) {
		super(props)

		this.state = {
			types: {
				donate:  {label: 'Пожертвования', icon: 'euro'},
				prayers: {label: 'Записки',       icon: 'tablet'},
				bricks:  {label: 'Кирпичи',       icon: 'grid'},
			}
		}
	}

	render() {
		return (		
			<div className="daily__detail__average">
				<h2 className="title">Средний чек</h2>
				<div className="daily__detail__average__list">
					{this.props.data.map((elem, i) => { 
						let type = this.state.types[elem.id]

						let summ = (elem.summ / elem.count).toFixed(2)
						return (
							<div key={elem.id} className="daily__detail__average__item">
								<div className={"daily__detail__average__icon icon_"+type.icon}></div>
								<div className="daily__detail__average__label">{type.label}: <br/><strong>{summ} руб.</strong></div>
							</div>
						)
					})}
				</div>	
			</div>
		)	
	}

}

export default Average