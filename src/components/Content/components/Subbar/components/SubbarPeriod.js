import React, {Component, PureComponent} from 'react'

class SubbarPreriod extends PureComponent {
	constructor(props) {
		super(props)

		this.changeFilters = this.changeFilters.bind(this);
		this.defaultFilters = this.defaultFilters.bind(this);

		this.state = {
			data: [
				{title: '1 день',    slug: '', value: 1},
				{title: 'Сорокоуст', slug: '', value: 40},
				{title: 'Шесть месяцев', slug: '', value: 182},
				{title: 'Один год',  slug: '', value: 365},
			]
		}
	}

	changeFilters(data) {
		let period = []

		if(this.props.period) {
			period = this.props.period.slice(0)
		}

		if(period && period.join(',').indexOf(data)>=0) {
			let index = period.indexOf(data)
			period.splice(index, 1)
		} else {
			period.push(data)
		}

		period.sort(function(a, b) {
			if (a > b) return 1
  			if (a == b) return 0
  			if (a < b) return -1
		})

		if(period.length == 0) {
			period = false
		}

		this.props.setQueryFilter({period: period})
	}

	defaultFilters() {
		this.props.setQueryFilter({period: false})
	}

	render() {
		let head_buttons = ''
		let active_filters = []

		if(this.props.period.length > 0) {
			head_buttons = <button className="subbar__widget__close" onClick={this.defaultFilters}><div></div></button>

			active_filters = this.props.period
		}
		
		return (
			<div className="subbar__widget subbar__filters">
				<div className="subbar__widget__head">
					<span>Период</span>
					{head_buttons}
				</div>
				<div className="subbar__filters__list">
					{this.state.data.map((elem, i) => {
						let input_checked = false    
						if(active_filters.indexOf(elem.value)>=0) {
							input_checked = true
						}

						if(this.props.curr_periods.length == 0 || this.props.curr_periods.indexOf(elem.value)>=0) {
							return (
								<div className="subbar__filters__item">
									<label className="checkbox">
										<input type="checkbox" onChange={(e) => this.changeFilters(elem.value)} name={elem.slug} value={elem.value} checked={input_checked}/>
										<div className="checkbox__box icon_check"></div>
										<span>{elem.title}</span>
									</label> 	
								</div>
							) 
						}
					})}
				</div>
        	</div>
		)	
	}

}

export default SubbarPreriod