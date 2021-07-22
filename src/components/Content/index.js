import React, {PureComponent} from 'react'

import Subbar from './components/Subbar/index'

import ContentList from './components/ContentList/index'
import ListHead    from './components/ContentList/components/ListHead'

import ContentHead from './components/ContentHead'
import ContentForm from './components/ContentForm/index'

class Content extends PureComponent {
	constructor(props) {
		super(props)

		this.setListOrder     = this.setListOrder.bind(this)
		this.setQueryFilter   = this.setQueryFilter.bind(this)
		this.setTimePeriod    = this.setTimePeriod.bind(this)
		this.setSearchValue   = this.setSearchValue.bind(this)
		this.displayContent   = this.displayContent.bind(this)
		this.setTotal         = this.setTotal.bind(this)

		this.state = {
			search: {
				value: '',
				type: 'id',
			},
			query: {
				states: [0,1,2],
				live: false,
				prayers: false,
				period: false
			},
			period: {
				curr: {start: 0, end: 0},
				default: {start: 0, end: 0}
			},
			sort: {
				field: 'id',
				order: 'DESC',
			},	
			total: 0
		}

	}

	setListOrder(field, order) {
		let sort = {field: field, order: order}

		this.setState({ 
			sort : sort
		})
	}

	setTotal(total) {
		this.setState({ 
			total : total
		})
	}

	setQueryFilter(filters) {
		let query = {}
		Object.assign(query, this.state.query)

		Object.keys(filters).map(function(filter_key, index) {
			query[filter_key] = filters[filter_key]
		});

		this.setState({ 
			query: query
		})
	}

	setTimePeriod(curr_time) {
		let period = {}
		Object.assign(period, this.state.period)

		period.curr = {start: new Date(curr_time.start), end: new Date(curr_time.end)}

		this.setState({ 
			period: period
		})
	}

	setSearchValue(value) {
		let email_pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i
		let type = 'name'

		if(Number(value) > 0) {
			type = 'id' 
		} else if(value != '' && value.search(email_pattern) != -1) {
			type = 'email'
		}

		this.setState({ 
			search: {
				value: value,
				type: type,
			}
		})
	}

	displayContent(type) {
		if(type == 'form') {
			let content_class = ''
			if(this.props.form_mode == 'edit') {
				content_class = 'content_edit'
			}

			return (
				<div className={"content "+content_class}>
					<ContentForm main_tab={this.props.main_tab} form_mode={this.props.form_mode} selected={this.props.selected} setMode={this.props.setMode} setSelected={this.props.setSelected} />
				</div>
			)
		} else if(type == 'list') {
			return (
				<div className="content">
					<Subbar 
						main_tab={this.props.main_tab} 
						query={this.state.query} 
						period={this.state.period}
						total={this.state.total}
						search={this.state.search}

						setQueryFilter={this.setQueryFilter} 
						setTimePeriod={this.setTimePeriod}
						setSearchValue={this.setSearchValue}
					/>
					<div className="content__inner">
						<ContentHead main_tab={this.props.main_tab} page_data={this.props.page_data} selected={this.props.selected} setMode={this.props.setMode} setSelected={this.props.setSelected}/>
						<ListHead 
							data_fields={this.state.dataFields} 
							sort={this.state.sort} 
							main_tab={this.props.main_tab} 
							
							setListOrder={this.setListOrder} 
						/>
						<ContentList 
							main_tab={this.props.main_tab} 
							query={this.state.query} 
							sort={this.state.sort} 
							time={this.state.period}
							search={this.state.search}
							selected={this.props.selected}

							setSelected={this.props.setSelected}
							setMode={this.props.setMode}
							setSearchValue={this.setSearchValue}
							setTotal={this.setTotal}
						/>
					</div>
				</div>
			)
		}
	}

	componentDidMount() {
		let dataFields = require('data/FieldsData.json')

		let curr_date = new Date()
		curr_date.setHours(0, 0, 0, 0);
		let end_date = new Date(curr_date.valueOf())

		this.setState({ 
			dataFields: dataFields,
			sort: {
				field: dataFields[this.props.main_tab][0].slug, 
				order: 'DESC',
			},
			period: {
				curr: {start: curr_date, end: curr_date},
				default: {start: new Date(1590375600 * 1000), end: end_date}
			}
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.main_tab !== this.props.main_tab || prevProps.mode !== this.props.mode) {
			this.setState({
				sort: {
					field: this.state.dataFields[this.props.main_tab][0].slug, 
					order: 'DESC',
				}
			})
		}
	}

	render() {
		return (
			this.displayContent(this.props.mode)
		)	
	}

}

export default Content