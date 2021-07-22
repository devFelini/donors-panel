import React, {Component} from 'react'

import ListPage from './components/ListPage'
import PageNav  from '../../../PageNav'

import {TimestampToDate, buildGETString, CountPages} from 'functions.js';

import $ from 'jquery'
 
class ContentList extends Component {
	contentListData = []

	constructor(props) {
		super(props)

		this.displayContent = this.displayContent.bind(this)
		this.lisetnerScroll = this.lisetnerScroll.bind(this)

		this.setCurrentPage = this.setCurrentPage.bind(this)
		this.setCountPages  = this.setCountPages.bind(this)

		this.state = {
			dataList: [],
			loading: {status: false, type: 'main'},
			pages: {
				current: 1,
				count: 100,
			},
			prev_mode: false
		}
	}
	
	getListData(direction = false, page = false) {
		if(direction != 'next' && direction != 'prev') {
			this.setState({loading: {status: true, type: 'main'}});
			$(".content__list__body").scrollTop(0);
		} else {
			this.setState({loading: {status: true, type: 'small'}});
		}

		let loaded_page = this.state.pages.current-1
		
		if(page) {
			loaded_page = page-1	
		}

		if(direction == 'next') {
			loaded_page++;
		} else if(direction == 'prev') {
			loaded_page--;
		}

		let params = {
			type   : this.props.main_tab,
			time_start : TimestampToDate(this.props.time.curr.start),
			time_end   : TimestampToDate(this.props.time.curr.end),
			sort   : this.props.sort.field,
			order  : this.props.sort.order,
			states : this.props.query.states.join(),
			offset : loaded_page * global.contentItemsPerPage,
		}

		if(this.props.search.value != '') {
			params.search_type  = this.props.search.type
			params.search_value = this.props.search.value
		}

		if(this.props.main_tab == 'prayer' || this.props.main_tab == 'bricks') {
			if(this.props.query.live) {
				params.live = this.props.query.live
			} 

			if(this.props.main_tab == 'prayer') {
				if(this.props.query.prayers) {
					params.prayers = this.props.query.prayers.join()
				}
				if(this.props.query.period) {
					params.period = this.props.query.period.join()
				}
			}
		}

		let respons = buildGETString('get_list', params)
		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
			.then(resp => {return resp.json()})
			.then(resBody => {
				let dataList = []
				let prev_mode = false

				if(direction !== false) {
					dataList = this.state.dataList.slice(0)	
		
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

				this.setState({ dataList: dataList, loading: {status: false, type: 'main'}, prev_mode: prev_mode});
				this.setCountPages(resBody.count)
			})
		
	}

	lisetnerScroll() {
		if(!this.state.loading.status) {
			let list_block = $(document).find(".content__list__body")
			let to_top = list_block.scrollTop()
			let inner_height = list_block.height()
			let list_height = $(document).find(".content__list__pages").height()

			if(to_top == 0 && this.state.pages.current != 1) {
				this.getListData('prev') 
			} else if(to_top > list_height - (inner_height + 1) && this.state.pages.current < this.state.pages.count) {
				this.getListData('next')
			} else {

				if(window.check_scroll) {

					list_block.find(".content__list__page").each(function(i, elem) {
						var et = $(elem).position().top
						var eh = $(elem).outerHeight()

						if(this.state.pages.current !== Number($(elem).data('page'))) {
							if ((et + eh > inner_height && et < inner_height / 2) || (et < 0 && et + eh > inner_height / 2)) { 
								this.setCurrentPage(Number($(elem).data('page')), false);
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
	
	setCurrentPage(next_page, update = true, param = false) {
		let pages = {}
		Object.assign(pages, this.state.pages)
		
		pages.current = Number(next_page)

		this.setState({ 
			pages: pages,
		})

		if(update) {
			this.getListData(param, Number(next_page))
		}
	}

	setCountPages(count) {
		let pages = {}
		Object.assign(pages, this.state.pages)
		
		pages.count = CountPages(count, global.contentItemsPerPage)

		this.setState({ 
			pages: pages,
		})

		this.props.setTotal(count);
	}

	componentDidMount() {
		window.check_scroll = true
		this.getListData()
		
		$(".content__list__body").on('scroll', this.lisetnerScroll);
	} 

	componentWillUnmount() {
		$(".content__list__body").off('scroll', this.lisetnerScroll);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.main_tab !== this.props.main_tab || 
		   prevProps.sort.field !== this.props.sort.field || 
		   prevProps.sort.order !== this.props.sort.order || 
		   prevProps.query !== this.props.query || 
		   prevProps.time.curr !== this.props.time.curr || 
		   prevProps.search.value !== this.props.search.value
		) {	
			this.setCurrentPage(1)
		}

		$(".content__list__body").off('scroll', this.lisetnerScroll);
		$(".content__list__body").on('scroll', this.lisetnerScroll);

		if(this.state.prev_mode == 'prev') {
			let list_body = $('.content__list__body')
			list_body.scrollTop(list_body.find('.content__list__page[data-page="'+this.state.pages.current+'"]').height())
			this.setState({ 
				prev_mode: false,
			})
		}

	} 

	displayContent(dataList) {
		if(dataList.length == 1 && dataList[0].data.length == 0) {
			return (
				<div className="content__list__body">
					<div className="content__list__pages">
						<div className="content__list__error">По вашему запросу ничего не найдено</div> 
					</div>
				</div>
			)
		} else {
			let loader_class = ''
			if(this.state.loading.status && this.state.loading.type == 'small') {
				loader_class = 'active'
			}

			let show_deleted = false
			if(this.props.query.states.indexOf(5) >= 0) {
				show_deleted = true
			} 
			return (
				<>
					<div className="content__list__body">
						<div className="content__list__pages">
							{dataList.map((page, i) => {    
								return (
									<ListPage 
										key={page.page}

										page={page.page}
										data={page.data}  
										
										main_tab={this.props.main_tab}
										selected={this.props.selected} 
										show_deleted={show_deleted}

										setSelected={this.props.setSelected} 
										setMode={this.props.setMode} 
										setSearchValue={this.props.setSearchValue}
									/>
								) 
							})}
						</div>
					</div>
					<div className="content__list__bottom">
						<div className={"content__list__bottom__loader "+loader_class}></div>
						<PageNav pages={this.state.pages} setCurrentPage={this.setCurrentPage} />
					</div>
				</>
			)
		}
	}

	render() {
		let loader_class = ''
		if(this.state.loading.status && this.state.loading.type == 'main') {
			loader_class = 'active'
		}

		return (
			<div className="content__list">
				{this.displayContent(this.state.dataList)}
				<div className={"content__list__loader "+loader_class}></div>
			</div>
		)	
	}

}

export default ContentList