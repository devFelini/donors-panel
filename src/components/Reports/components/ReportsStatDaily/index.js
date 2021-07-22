import React, {Component, PureComponent} from 'react'

import DailyList from './components/DailyList'
import DailyDetail from './components/DailyDetail/index'
class ReportsStatDaily extends Component {
	constructor(props) {
		super(props)

		this.showPage = this.showPage.bind(this);
		this.setMode = this.setMode.bind(this);

		this.state = {
			mode: 'list',
			active_day: 0,
		}
	}

	setMode(mode, day) {
		this.setState({
			mode: mode,
			active_day: day,
		})
	}

	showPage() {
		if(this.state.mode == 'list') {
			return (
				<DailyList setMode={this.setMode}/>
			)	
		} else {
			return (
				<DailyDetail setMode={this.setMode} date={this.state.active_day}/>
			)
		}
	}

	render() {
		return (
			<div>
				{this.showPage()}
			</div>
		)	
	}

}

export default ReportsStatDaily