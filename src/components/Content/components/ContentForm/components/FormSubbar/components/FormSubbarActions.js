import React, {Component, PureComponent} from 'react'

class FormSubbar extends PureComponent {
	constructor(props) {
		super(props)

		this.selectActions = this.selectActions.bind(this)

		this.state = {
			actions: [
				{id: 'send_on_email', label: 'Отправить на почту',  types: ['prayer', 'bricks']},
				{id: 'open_sert',     label: 'Открыть сертификат',  types: ['bricks']},
				{id: 'update_stat',   label: 'Обновить статистику', types: ['donate', 'prayer', 'bricks']},
			]
		}
	}

	selectActions(action) {
		let actions = this.props.actions.slice(0)

		if(actions.indexOf(action) >= 0) {
			let index = actions.indexOf(action)
			actions.splice(index, 1)
		} else {
			actions.push(action)
		}

		this.props.selectActions(actions)
	}

	render() {
		return (
			<div className="subbar__widget subbar__actions">
				<div className="subbar__widget__head">
					<span>После сохранения</span>
				</div>
				<div className="subbar__filters__list">
					{this.state.actions.map((elem, i) => {
						if(elem.types.find(item => item === this.props.main_tab) && ((elem.id != 'open_sert' && elem.id != 'send_on_email') || this.props.status == 1)) {

							let input_checked = false    
							if(Array.isArray(this.props.actions) && this.props.actions.indexOf(elem.id) >= 0) {
								input_checked = true
							}

							return (
								<div key={elem.id} className="subbar__filters__item">
									<label className="checkbox">
										<input type="checkbox" onChange={(e) => this.selectActions(elem.id)} checked={input_checked} />
										<div className="checkbox__box icon_check"></div>
										<span>{elem.label}</span>
									</label> 	
								</div>
							)
						}
					})}
				</div>
			</div>
		)	
	}

}

export default FormSubbar