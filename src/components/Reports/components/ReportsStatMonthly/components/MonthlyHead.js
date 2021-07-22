import React, {PureComponent} from 'react'

import {getMonthLabel} from 'functions.js'

class MonthlyHead extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="daily__month">
				<div className="daily__month__item daily__month__item_date">{this.props.curr_year}</div>
				<div className="daily__month__item daily__month__item_donate">Пожертвования</div>
				<div className="daily__month__item daily__month__item_prayer">Записки</div>
				<div className="daily__month__item daily__month__item_bricks">Кирпичи</div>
				<div className="daily__month__item daily__month__item_total">Итог</div>
			</div>
		)	
	}
}

export default MonthlyHead