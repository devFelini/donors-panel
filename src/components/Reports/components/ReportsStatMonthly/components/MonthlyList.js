import React, {Component} from 'react'

import MonthlyItem from './MonthlyItem'
import MonthlyHead from './MonthlyHead'

import PageNav   from 'components/PageNav'
import {CountPages, buildGETString} from 'functions'

import $ from 'jquery'

class MonthlyList extends Component {
	constructor(props) {
		super(props)

		this.setCurrentPage    = this.setCurrentPage.bind(this)
		this.lisetnerScroll    = this.lisetnerScroll.bind(this)
		this.checkCurrentMonth = this.checkCurrentMonth.bind(this)
		this.setItemData       = this.setItemData.bind(this)

		let date = new Date()
		
		this.state = {
			pages: {
				current: 1,
				count: 100,
			},
			data: [],
			loading: {status: false, type: 'main'},
			prev_mode: false,
			curr_year: date.getFullYear(), 
		}

	}

	getData(direction = false, page = false) {
		if(direction != 'next' && direction != 'prev') {
			this.setState({loading: {status: true, type: 'main'}});
			$(".daily__list").scrollTop(0);
		} else {
			this.setState({loading: {status: true, type: 'small'}});
		}

		let loaded_page = this.state.pages.current
		
		if(page) {
			loaded_page = page	
		}

		if(direction == 'next') {
			loaded_page++;
		} else if(direction == 'prev') {
			loaded_page--;
		}

		let respons = buildGETString('get_monthly_stat', {
			page: loaded_page
		})
	
		console.log(respons);
		
		fetch(respons)
			.then(resp => {return resp.json()})
			.then(resBody => {

				let dataList = []
				let prev_mode = false

					if(direction !== false) {
						dataList = this.state.data.slice(0)	
			
						if(direction == 'prev') {
							prev_mode = 'prev'
							dataList.unshift({page: this.state.pages.current-1, data: resBody.list})
						} else if(direction == 'next') {
							prev_mode = 'next'
							dataList.push({page: this.state.pages.current+1, data: resBody.list})
						}
					} else {
						dataList.push({page: this.state.pages.current, data: resBody.list})
					}
				
				this.setState({
					data: dataList,
					loading: {status: false, type: 'main'},
					pages: {
						current: this.state.pages.current,
						count: CountPages(resBody.count, global.reportsItemsPerPage)
					},
					prev_mode: prev_mode
				})
			})
	}

	lisetnerScroll() {
		if(!this.state.loading.status) {
			let list_block = $(document).find(".daily__list")
			let to_top = list_block.scrollTop()
			let inner_height = list_block.height()
			let list_height = $(document).find(".daily__list__pages").height()

			if(to_top == 0 && this.state.pages.current != 1) {
				this.getData('prev') 
			} else if(to_top > list_height - (inner_height + 1) && this.state.pages.current < this.state.pages.count) {
				this.getData('next')
			} else {

				if(window.check_scroll) {
					this.checkCurrentMonth()

					list_block.find(".daily__list__page").each(function(i, elem) {
						var et = $(elem).position().top
						var eh = $(elem).outerHeight()

						if(this.state.pages.current !== Number($(elem).data('page'))) {
							if((et + eh > inner_height && et < inner_height / 2) || (et < 0 && et + eh > inner_height / 2)) { 
								this.setCurrentPage(Number($(elem).data('page')), false)
								return false
							}
						}
					}.bind(this))

					window.check_scroll = false
					setTimeout(function() { window.check_scroll = true }, 100)
				}
			}
		}
	}

	checkCurrentMonth() {
		let list_block = $(document).find(".daily__list")
		list_block.find(".daily__item").each(function(i, elem) {
			let top = $(elem).position().top
			if(top > 0) {
				let year = Number($(elem).data('year'))

				if(year != this.state.curr_year) {
					this.setState({ 
						curr_year: year
					})
				} 

				return false
			}
			
		}.bind(this))
	}

	setCurrentPage(next_page, update = true, param = false) {
		let pages = {}
		Object.assign(pages, this.state.pages)
		
		pages.current = Number(next_page)

		this.setState({ 
			pages: pages,
		})

		if(update) {
			this.getData(param, Number(next_page))
		}
	}

	setItemData(updated) {
		let data = this.state.data.slice(0)

		data.map((page, i) => {  
			let index = page.data.findIndex(item => item.date == updated.date)
			if(index !== -1) {
				data[i].data[index] = updated;
				return false;
			}
 		})

		this.setState({ 
			data: data,
		})
	}

	componentDidMount() {
		window.check_scroll = true
		this.getData()
		
		$(".daily__list").on('scroll', this.lisetnerScroll);
	}

	componentWillUnmount() {
		$(".daily__list").off('scroll', this.lisetnerScroll);
	}

	componentDidUpdate(prevProps, prevState) {	
		this.checkCurrentMonth()

		$(".daily__list").off('scroll', this.lisetnerScroll);
		$(".daily__list").on('scroll', this.lisetnerScroll);

		if(this.state.prev_mode == 'prev') {
			let list_body = $('.daily__list')
			list_body.scrollTop(list_body.find('.daily__list__page[data-page="'+this.state.pages.current+'"]').height())
			this.setState({ 
				prev_mode: false,
			})
		}

	} 

	render() {
		let month_num = 0

		let loader_class = ''
		if(this.state.loading.status && this.state.loading.type == 'main') {
			loader_class = 'active'
		}

		let small_loader_class = ''
		if(this.state.loading.status && this.state.loading.type == 'small') {
			small_loader_class = 'active'
		}

		return (
			<div className="daily">
				<MonthlyHead curr_month={this.state.curr_month} curr_year={this.state.curr_year} />
				<div className="daily__list">
					<div className="daily__list__pages">
						{this.state.data.map((page, i) => {  
							return (
								<div className="daily__list__page" key={page.page} data-page={page.page}>
									{page.data.map((elem, j) => { 
										let date = new Date(elem.date)	
										return (
											<MonthlyItem key={elem.date} data={elem} date={date} setMode={this.props.setMode} setItemData={this.setItemData}/>
										)		
									
									})}
								</div>
							)
						})}
					</div>
					<div className={"content__list__loader "+loader_class}></div>
				</div>
				<div className="daily__bottom">
					<div className={"content__list__bottom__loader "+small_loader_class}></div>
					<PageNav pages={this.state.pages} setCurrentPage={this.setCurrentPage} />
				</div>
			</div>
		)	
	}

}

export default MonthlyList