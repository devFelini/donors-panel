import React, {PureComponent} from 'react'

class InfoBar extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {

		let list_data = []

		list_data.push({label: "ID", value: this.props.id})
		if(this.props.pos) {
			list_data.push({label: "Номер", value: this.props.pos})
		}

		if(this.props.number) {
			list_data.push({label: "Номер сертификата", value: this.props.number})
		}

		list_data.push({label: "ART", value: this.props.art})

		return (
			<div className="content__form__info">
				<ul>
					{list_data.map((elem, i) => {    
						return (
							<li>{elem.label}: <span className="green">{elem.value}</span></li>
						)
					})}
				</ul>
			</div>	
		)	
	}

}

export default InfoBar 