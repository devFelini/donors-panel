import React, {Component, PureComponent} from 'react'

class SidebarMenu extends Component {
	menuData = require('../../../data/MenuData.json')

	constructor(props) {
		super(props)
		this.openCat = this.openCat.bind(this);

		this.state = {
			activeCat: 'donate',
			main_tab: '',
		}
	}

	openCat(e, id) {
		e.preventDefault();
		this.props.setMainTab(id, true);
	}

	render() {
		return (
			<nav className="sidebar__nav sidebar__nav_menu"> 
				{Object.keys(this.menuData).map((key, i) => {    
					let button_class = "sidebar__nav__button "
					if(key == this.props.main_tab) {
						button_class += "active"
					}
					let icon_class = "sidebar__nav__button__icon icon_"+this.menuData[key].icon
					return (
						<a href={"/"+key+"/"} key={key} className={button_class} onClick={(e) => this.openCat(e, key)}>
							<div className={icon_class}></div>	
							<span>{this.menuData[key].title}</span>
						</a>
					) 
				})}
			</nav>
		)	
	}
}

export default SidebarMenu