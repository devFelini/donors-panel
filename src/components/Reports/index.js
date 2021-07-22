import React, {Component, PureComponent} from 'react'

import ReportsDiagram from './components/ReportsDiagram/index'
import ReportsStatDaily from './components/ReportsStatDaily/index'
import ReportsStatMonthly from './components/ReportsStatMonthly/index'

import ReportsSubbar from './components/Subbar/index' 

class Reports extends Component {
	constructor(props) {
		super(props)

		this.setCurrPage = this.setCurrPage.bind(this)
		this.displayContent = this.displayContent.bind(this)

		this.state = { 
			curr_page: 'diagram',
		}
	}

	componentDidMount() {
		let path = window.location.pathname.split('/')
		let page = 'diagram'
		
		if(path[2]) {
			page = path[2]
		} else {
			let path = '/report/'+page
    		window.history.pushState({route: path}, "Админ панель", path)
		}

		this.setState({
			curr_page: page
		});
	}

	setCurrPage(value) {
		let path = '/report/'+value
		window.history.pushState({route: path}, "Админ панель - Отчеты", path)
		
		this.setState({
			curr_page: value
		})
	}

	displayContent(curr_page) {
		if(curr_page == 'diagram') {
			return (
				<ReportsDiagram />
			)
		} else if(curr_page == 'stat_daily') {
			return (
				<ReportsStatDaily />
			)
		} else if(curr_page == 'stat_monthly') {
			return (
				<ReportsStatMonthly />
			)
		}
	}

	render() {
		return (
			<div className="content content_reports">
				<ReportsSubbar curr_page={this.state.curr_page} setCurrPage={this.setCurrPage} />
				<div className="reports__inner">
					<div className="reports__wrap">
						{this.displayContent(this.state.curr_page)}
					</div>
				</div>
			</div>
		)	
	}

}

export default Reports