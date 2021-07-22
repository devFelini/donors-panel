import React, {Component, PureComponent} from 'react'

class ContentHead extends PureComponent {
	constructor(props) {
		super(props)

		this.deleteItem     = this.deleteItem.bind(this)
		this.displayButtons = this.displayButtons.bind(this)
	}

	deleteItem() {
		let respons =  global.queryAddress+'?action=delete_item&type='+this.props.main_tab+"&id="+this.props.selected.join(',')

		console.log(respons);

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {
			this.props.setMode({content: 'list', form: 'add', selected: []})
		})
	}

	displayButtons() {
		let buttons = []
		if(this.props.selected && this.props.selected.length > 0) {
			buttons.push(<button key="cancel" className="btn btn_grey" onClick={(e) => this.props.setSelected([])}>Отмена</button>)
			buttons.push(<button key="delete" className="btn btn_red" onClick={(e) => this.deleteItem()}>Удалить выбранное</button>)
		} else {
			buttons.push(<button key="add"    className="btn btn_green" onClick={(e) => this.props.setMode({content: 'form', form: 'add'})}>Добавить</button>)
		}

		return buttons
	}

	render() {
		let buttons = this.displayButtons()
		return (
			<div className="content__head">
              	<h2 className="title">{this.props.page_data.title}</h2> 
			  	<div className="content__head__buttons">
					{buttons} 
			  	</div>  
            </div> 
		)	
	}

}

export default ContentHead