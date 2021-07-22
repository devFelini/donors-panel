import React, {Component} from 'react'

class ItemActions extends Component {

	constructor(props) {
		super(props)

		this.selectItem = this.selectItem.bind(this)
		this.deleteItem = this.deleteItem.bind(this)
		this.deleteBtn  = this.deleteBtn.bind(this)
		this.selectBtn  = this.selectBtn.bind(this)

		this.state = {
			delete: false,
			selected: false,
		}
	}
	
	selectItem() {
		let selected = this.props.selected.slice(0);

		if(selected.indexOf(this.props.id) === -1) {
			selected.push(this.props.id)
		} else {
			let index = selected.indexOf(this.props.id);
			selected.splice(index, 1);
		}

		this.props.setMode({content: 'list', form: 'add', selected: selected})
	}

	deleteItem() {
		if(this.state.delete) {
			this.props.deleteItem(this.props.id)
		} else {
			this.setState({ delete: true });
		}
	}

	deleteBtn() {
		let delete_btn_class = ''
		if(this.state.delete) {
			delete_btn_class = 'active'
		}

		if(this.props.status !== 5) {		
			return (
				<button className={"actions__btn actions__delete "+delete_btn_class} onClick={this.deleteItem}><span>Удалить</span><div className="icon_busket"></div></button>
			)
		} else {
			return ''
		}
	}

	selectBtn() {
		let selected_class = ''

		if(this.props.selected.indexOf(this.props.id) !== -1) {
			selected_class = 'active'
		}

		if(this.props.status !== 5) {		
			return (
				<button className={"actions__btn actions__select "+selected_class} onClick={this.selectItem}><div className="icon_check"></div></button>
			)
		} else {
			return ''
		}
	}

	render() {
		let delete_btn = this.deleteBtn()
		let select_btn = this.selectBtn()
		return (
			<div className="actions">
				{delete_btn}
				<button className="actions__btn actions__edit" onClick={(e) => this.props.setMode({content: 'form', form: 'edit', selected: [this.props.id]})}><div className="icon_gear"></div></button>
				{select_btn}
			</div>
		)	
	}
}

export default ItemActions