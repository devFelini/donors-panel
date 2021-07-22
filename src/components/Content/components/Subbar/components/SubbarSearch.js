import React, {Component, PureComponent} from 'react'


class SubbarSearch extends PureComponent {
	constructor(props) {
		super(props)

		this.setFieldValue = this.setFieldValue.bind(this)
		this.searchRun = this.searchRun.bind(this)
		this.clearSearch = this.clearSearch.bind(this)

		this.state = {
			fieldValue: '',
		}
	}

	setFieldValue(input) {
		this.setState({
			fieldValue: input.target.value,
		})
	}

	searchRun() {
		this.props.setSearchValue(this.state.fieldValue)
	}

	clearSearch() {
		this.setState({
			fieldValue: '',
		})

		this.props.setSearchValue('')
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.search.value != this.state.fieldValue && this.props.search.value != prevProps.search.value) {
			this.setState({
				fieldValue: this.props.search.value,
			})
		}
	}

	render() {
		let head_buttons = ''

		if(this.state.fieldValue != '') {
			head_buttons = <button className="subbar__widget__close" onClick={this.clearSearch}><div></div></button>
		}

		return (
			<div className="subbar__widget subbar__search">
				<div className="subbar__widget__head">
					<span>Поиск</span>
					{head_buttons}
				</div>
				<div className="subbar__search__content">
					<div className="subbar__search__inner">
						<input type="text" name="search" className="subbar__search__field" value={this.state.fieldValue} onChange={(e) => this.setFieldValue(e)} placeholder="Поиск"/>
						<button className="subbar__search__button icon_search" onClick={(e) => this.searchRun()}></button>
					</div>
				</div>	
			</div>
		)	
	}

}

export default SubbarSearch