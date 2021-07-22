import React, {Component, PureComponent} from 'react'
import {StatusIcon} from 'functions.js';

class SubbarFilters extends PureComponent {
	constructor(props) {
		super(props)

		this.changeFilters = this.changeFilters.bind(this);
		this.defaultFilters = this.defaultFilters.bind(this);

		this.state = {
			filters_default: [0, 1, 2],
			data: [
				{title: 'Успешные',      slug: 'success',   value: 1},
				{title: 'Незавершенные', slug: 'processed', value: 0},
				{title: 'Ошибочные',     slug: 'failed',    value: 2},
				{title: 'Удаленные',     slug: 'deleted',   value: 5},
			]
		}
	}

	changeFilters(data) {
		let states = this.props.states.slice(0);
		if(this.props.states.join(',').indexOf(data)>=0) {
			let index = states.indexOf(data);
			states.splice(index, 1);
		} else {
			states.push(data);
		}

		states.sort(function(a, b) {
			if (a > b) return 1;
  			if (a == b) return 0;
  			if (a < b) return -1;
		})

		if(states.length == 0) {
			states = this.state.filters_default
		}

		this.props.setQueryFilter({states: states});
	}

	defaultFilters() {
		this.props.setQueryFilter({states: this.state.filters_default});
	}

	render() {
		let head_buttons = ''

		if(this.state.filters_default.length != this.props.states.length || !(this.state.filters_default.every((v,i)=>v === this.props.states[i]))) {
			head_buttons = <button className="subbar__widget__close" onClick={this.defaultFilters}><div></div></button>
		}
		
		return (
			<div className="subbar__widget subbar__filters">
				<div className="subbar__widget__head">
					<span>Транзакции</span>
					{head_buttons}
				</div>
				<div className="subbar__filters__list">
					{this.state.data.map((elem, i) => {
						let status = StatusIcon(elem.value)

						let input_checked = false    
						if(this.props.states.join(',').indexOf(elem.value)>=0) {
							input_checked = true
						}

						return (
							<div key={elem.slug} className="subbar__filters__item">
								<label className="checkbox">
									<input type="checkbox" onChange={(e) => this.changeFilters(elem.value)} name={elem.slug} value={elem.value} checked={input_checked}/>
									<div className={'status-icon '+status.className}><div className={status.icon}></div></div>
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

export default SubbarFilters