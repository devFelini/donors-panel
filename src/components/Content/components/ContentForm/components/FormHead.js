import React, {PureComponent} from 'react'

class FormHead extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			title: {
				mode: {
					add: 'Добавление',
					edit: 'Редактирование'
				}, 
				type: {
					donate: ' пожертвования',
					prayer: ' записки', 
					bricks: ' кирпича', 	
				}
			},
		}
	}

	render() {
		let form_title = this.state.title.mode[this.props.mode] +' '+ this.state.title.type[this.props.type]

		return (
			<div className="content__head">
				<h2 className="title">{form_title}</h2>
				<div className="content__head__buttons">
					<button className="btn btn_grey" onClick={(e) => this.props.setMode({content: 'list', form: 'add', selected: []})}>Закрыть</button>
					<button className="btn btn_green" onClick={(e) => this.props.saveItem()}>Сохранить</button>
				</div>
			</div>
		)	
	}

}

export default FormHead