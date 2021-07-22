import React, {Component, PureComponent} from 'react'

class ReportsDiagramSelectInfo extends PureComponent {

	constructor(props) {
		super(props)

		this.toggleMenu = this.toggleMenu.bind(this)
		this.buildMenu  = this.buildMenu.bind(this)

		this.state = {
			openMenu: false,
			data: [
				{label: 'Количество пожертвований', value: 'count', day_mode: true},
				{label: 'Сумма пожертвований', value: 'summ', day_mode: true},
				{label: 'Средний чек', value: 'average_summ', day_mode: false},
			]
		}
	}

	toggleMenu() {
		this.setState({
			openMenu: !this.state.openMenu,
		})
	}

	buildMenu(open) {
		if(open) {
		return (
				<div className="reports__diagram__info__menu">
					<ul>
						{this.state.data.map((elem, i) => {  
							if(elem.value != this.props.type && (!this.props.is_day || elem.day_mode)) {
								return (
									<li onClick={(e) => this.props.changeInfo(elem.value)}>{elem.label}</li>
								)
							}
						})}
					</ul>
				</div>
			)
		} else {
			return ''
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.type != this.props.type) {
			this.setState({
				openMenu: false,
			})
		}
	} 

	render() {
		let label = this.state.data.find(elem => elem.value === this.props.type).label
		return (
			<div className="reports__diagram__info">
				<button className="reports__diagram__info__btn" onClick={this.toggleMenu}>{label}</button>
				{this.buildMenu(this.state.openMenu)}
			</div>
		)	
	}
}

export default ReportsDiagramSelectInfo