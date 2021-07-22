import React, {Component, PureComponent} from 'react'

class ReportsDiagramSelectDonate extends PureComponent {

	constructor(props) {
		super(props)

		this.changeTypes = this.changeTypes.bind(this)

		this.state = {
			data: [
				{id: 'donate',  icon: 'euro',   label: 'Пожертвования'},
				{id: 'prayers', icon: 'tablet', label: 'Записки'},
				{id: 'bricks',  icon: 'grid',   label: 'Кирпичи'}
			],
		}
	}

	changeTypes(value) {
		let types = this.props.types.slice(0);
		
		if(this.props.types.indexOf(value)>=0) {
			let index = types.indexOf(value);
			types.splice(index, 1);
		} else {
			types.push(value);
		}

		this.props.changeTypes(types);
	}

	render() {
		return ( 
			<div className="reports__diagram__donate">
				{this.state.data.map((elem, i) => { 
					let active_class = ''

					if(this.props.types.find(item  => item == elem.id)) {
						active_class = 'active'
					}

					return (
						<label key={elem.id} className={"reports__diagram__donate__type "+active_class}>
							<input type="checkbox" value={elem.id} onChange={(e) => this.changeTypes(elem.id)}></input>
							<div className={"reports__diagram__donate__type__icon icon_"+elem.icon}></div>		
							<div className="reports__diagram__donate__type__text">{elem.label}</div>
						</label>
					)
				})}
			</div>	
		)	
	}
}

export default ReportsDiagramSelectDonate