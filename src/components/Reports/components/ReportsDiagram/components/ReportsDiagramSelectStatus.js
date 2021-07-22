import React, {Component, PureComponent} from 'react'
import {StatusIcon} from 'functions.js';

class ReportsDiagramSelectStatus extends PureComponent {

	constructor(props) {
		super(props)

		this.toggleMenu = this.toggleMenu.bind(this)
		this.buildMenu  = this.buildMenu.bind(this)

		this.state = {
			openMenu: false,
			data: [
				{id: 0, code: 'p', label: 'Все транзакции'},
				{id: 1, code: 's', label: 'Успешные транзакции'},
				{id: 2, code: 'e', label: 'Ошибочные транзакции'}
			]
		}
	}

	toggleMenu() {
		this.setState({
			openMenu: !this.state.openMenu,
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.status != this.props.status) {
			this.setState({
				openMenu: false,
			})
		}
	} 

	buildMenu(open) {
		if(open) {
			return (
				<div className="reports__diagram__status__menu">
					<ul>
						{this.state.data.map((elem, i) => {  
							if(this.props.status != elem.code) {
								let status = StatusIcon(elem.id)

								return (
									<li onClick={(e) => this.props.changeStatus(elem.code)}>
										<div className={"status-icon "+status.className}><div className={status.icon}></div></div>
										<span>{elem.label}</span>
									</li>
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


	render() {
		let active = this.state.data.find(elem => elem.code === this.props.status)
		let status = StatusIcon(active.id)
		return ( 
			<div className="reports__diagram__status">
				<button className="reports__diagram__status__btn" onClick={this.toggleMenu}>
					<div className={"status-icon "+status.className}><div className={status.icon}></div></div>
					<div className="reports__diagram__status__label">{active.label}</div>
				</button>
				{this.buildMenu(this.state.openMenu)}
			</div>	
		)	
	}
}

export default ReportsDiagramSelectStatus