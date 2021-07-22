import React, {Component, PureComponent} from 'react'

import SidebarMenu from './components/SidebarMenu'
import $ from 'jquery'

class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.toggleSidebar = this.toggleSidebar.bind(this)

		this.state = {
			isOpen: props.defaultOpen,
			count: 0,
			main_tab: 'donate'
		}	
	}

	toggleSidebar() {
		setTimeout(function() {
			$(window).trigger('resize')
		}, 400)
		
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	render() {
		let sidebarClass = 'sidebar';

		if(this.state.isOpen) { sidebarClass +=' opened'; }

		return (
			<aside className={sidebarClass} id="sidebar">
				<SidebarMenu main_tab={this.props.main_tab} setMainTab={this.props.setMainTab}/>
				<nav className="sidebar__nav sidebar__nav_bottom">
					<button id="nav-btn-logout" className="sidebar__nav__button">
						<div className="sidebar__nav__button__icon icon_power"></div>
						<span>Выход</span>
					</button>
					<button id="sidebar-trigger" className="sidebar__nav__button" onClick={this.toggleSidebar}>
						<div className="sidebar__nav__button__icon icon_arrow-inside"></div>
						<span>Свернуть</span>
					</button>
				</nav>	
			</aside> 
		)	
	}

}

export default Sidebar