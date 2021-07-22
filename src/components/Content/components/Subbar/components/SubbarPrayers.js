import React, {Component, PureComponent} from 'react'

import {unique} from 'functions.js';

class SubbarPrayers extends PureComponent {
	constructor(props) {
		super(props)

		this.changeFilters = this.changeFilters.bind(this);
		this.defaultFilters = this.defaultFilters.bind(this);

		this.state = {
			data: [
				{title: 'Литургия',    slug: '', value: 491,  live: true,  period: [1, 40]},
				{title: 'Проскомидия', slug: '', value: 490,  live: true,  period: [1, 40]},
				{title: 'Псалтирь',    slug: '', value: 492,  live: true,  period: [40, 182, 365]},
				{title: 'Панихида',    slug: '', value: 493,  live: false, period: [1]},
				{title: 'Молебен',     slug: '', value: 1935, live: false, period: [1]},
				{title: 'Акафист',     slug: '', value: 1936, live: false, period: [40, 182, 365]},
			]
		}
	}

	changeFilters(data) {
		let prayers = []

		if(this.props.prayers) {
			prayers = this.props.prayers.slice(0)
		}

		if(prayers && prayers.join(',').indexOf(data)>=0) {
			let index = prayers.indexOf(data)
			prayers.splice(index, 1)
		} else {
			prayers.push(data)
		}

		prayers.sort(function(a, b) {
			if (a > b) return 1
  			if (a == b) return 0
  			if (a < b) return -1
		})

		let live = false
		let period = []

		if(prayers.length == 0) {
			prayers = false
		} else {
			prayers.forEach(prayer => {
				let prayer_data = this.state.data.find(item => item.value === prayer)

				if(prayer_data.live) {
					live = true
				}
				
				period = period.concat(prayer_data.period)
			});

			period =  unique(period)
		}

		this.props.setQueryFilter({prayers: prayers, live: false, period: []})

		this.props.changeLivePeriodFilters(live, period)
	}

	defaultFilters() {
		this.props.setQueryFilter({prayers: false})
		this.props.changeLivePeriodFilters(true, [])
	}

	render() {
		let head_buttons = ''
		let active_filters = []

		if(this.props.prayers) {
			head_buttons = <button className="subbar__widget__close" onClick={this.defaultFilters}><div></div></button>

			active_filters = this.props.prayers
		}
		
		return (
			<div className="subbar__widget subbar__filters">
				<div className="subbar__widget__head">
					<span>Тип требы</span>
					{head_buttons}
				</div>
				<div className="subbar__filters__list">
					{this.state.data.map((elem, i) => {
						let input_checked = false    
						if(active_filters.indexOf(elem.value)>=0) {
							input_checked = true
						}

						return (
							<div className="subbar__filters__item">
								<label className="checkbox">
									<input type="checkbox" onChange={(e) => this.changeFilters(elem.value)} name={elem.slug} value={elem.value} checked={input_checked}/>
									<div className="checkbox__box icon_check"></div>
									<span>{elem.title}</span>
								</label> 	
							</div>
						) 
					})}
				</div>
        	</div>
		)	
	}

}

export default SubbarPrayers