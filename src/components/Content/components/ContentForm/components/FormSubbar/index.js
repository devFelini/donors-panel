import React, {Component, PureComponent} from 'react'

import FormSubbarActions from './components/FormSubbarActions';

class FormSubbar extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		let bottom_buttons = []

		if(this.props.mode == 'edit' && this.props.status != 5) {
			bottom_buttons.push(<button className="subbar__form__delete btn" onClick={(e) => this.props.deleteItem(this.props.id)}><span className="icon_busket">Удалить</span></button>)
		}

		return (
			<div className="subbar subbar_form">
				<div className="subbar__widgets">
					<FormSubbarActions main_tab={this.props.main_tab} status={this.props.status} actions={this.props.actions} selectActions={this.props.selectActions} />
				</div>
				<div className="subbar__form__bottom">
					{bottom_buttons}
				</div>
			</div>
		)	
	}

}

export default FormSubbar