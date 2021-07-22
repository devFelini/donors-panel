import React, {Component, PureComponent} from 'react'

import {FormatedPrice} from 'functions.js';

import SubbarSearch  from './components/SubbarSearch'
import SubbarDate    from './components/SubbarDate'
import SubbarFilters from './components/SubbarFilters'
import SubbarPrayers from './components/SubbarPrayers'
import SubbarLive    from './components/SubbarLive'
import SubbarPeriod  from './components/SubbarPeriod'

class Subbar extends PureComponent {
	constructor(props) {
		super(props)	

		this.state = {
			live: true,
			period: [],
		}

		this.changeLivePeriodFilters = this.changeLivePeriodFilters.bind(this);
	}

	changeLivePeriodFilters(live, period) {
		this.setState({ 
			live: live,
			period: period,
		})
	}
	

	render() {
		let widgets = [];
		if(this.props.main_tab == 'donate' || this.props.main_tab == 'prayer' || this.props.main_tab == 'bricks') {
			widgets.push(<SubbarSearch key="search" search={this.props.search} setSearchValue={this.props.setSearchValue} />)
			widgets.push(<SubbarDate key="date" period={this.props.period} setTimePeriod={this.props.setTimePeriod} />)
			
			widgets.push(<SubbarFilters key="filters" states={this.props.query.states} setQueryFilter={this.props.setQueryFilter} />)
			if(this.props.main_tab == 'prayer') {
				widgets.push(<SubbarPrayers key="prayers" prayers={this.props.query.prayers} setQueryFilter={this.props.setQueryFilter} changeLivePeriodFilters={this.changeLivePeriodFilters} />)
			}
			if(this.props.main_tab != 'donate' && this.state.live) {
				widgets.push(<SubbarLive key="live" live={this.props.query.live} setQueryFilter={this.props.setQueryFilter} />)
			}
			if(this.props.main_tab == 'prayer' && this.state.period.length != 1) {
				widgets.push(<SubbarPeriod key="period" period={this.props.query.period} setQueryFilter={this.props.setQueryFilter} curr_periods={this.state.period} />)
			}
		}

		return (
			<div id="subbar" className="subbar">
				<div className="subbar__widgets">
					{widgets}
				</div>
				<div className="subbar__results">
					<div className="subbar__results__label">Найдено записей:</div>	
					<div className="subbar__results__count">{FormatedPrice(this.props.total)}</div>	
				</div>
        	</div>
		)	
	}

}

export default Subbar