import { kMaxLength } from 'buffer'
import React, {Component, PureComponent} from 'react'
import $ from 'jquery'

class ListNav extends PureComponent {
	constructor(props) {
		super(props)

		this.changePage = this.changePage.bind(this);
		this.setMaxMinNumbers = this.setMaxMinNumbers.bind(this);

		this.state = {
			min_page: 1,
			max_page: 5,
		}
	}

	changePage(btn) {
		let next = btn.target.getAttribute('value')

		if(next != this.props.pages.current) {

			if(((this.props.pages.current > 3 && next < 3) || next > 3) && (next < this.props.pages.count - 2)) {
				let nav_list =  $('#nav_list')
				let diff = this.props.pages.current - next

				nav_list.addClass('animate')
				nav_list.css({marginLeft: (diff * 40)+"px"})

				nav_list.find('.content__nav__btn[value="'+next+'"]').addClass('active').siblings().removeClass('active')
			}

			setTimeout(function() {
				this.props.setCurrentPage(next);
			}.bind(this), 300)
		
		}
	}

	setMaxMinNumbers() {
		let min = this.props.pages.current
		let max = this.props.pages.current

		let buttons_count = 8;

		while(min > 1 && buttons_count > 4) {
			min--; buttons_count--;
		}

		while(max < this.props.pages.count && buttons_count > 0) {
			max++; buttons_count--;
		}
		
		this.setState({
			max_page: max,
			min_page: min
		})

	}

	componentDidMount() {
		this.setMaxMinNumbers();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.pages.current !== this.props.pages.current || prevProps.pages.count !== this.props.pages.count) {
			
			let nav_list = $('#nav_list')
			nav_list.removeClass('animate')
			nav_list.css({marginLeft: "0px"})

			this.setMaxMinNumbers();
		}
	} 

	render() {
		let nav_items = []
		let list_class = ''
		if(this.props.pages.current > 4 && this.props.pages.current < this.props.pages.count - 1) {
			list_class += 'content__nav__list_center';
		} else if(this.props.pages.current > 3 && this.props.pages.current < this.props.pages.count) {
			list_class += 'content__nav__list_half-center';
		}

		for (var i = this.state.min_page; i <= this.state.max_page; i++) {
			let btn_class = ''
			if(this.props.pages.current == i) {
				btn_class = 'active'
			}
			nav_items.push(<button key={i} className={"content__nav__btn "+btn_class} value={i} onClick={this.changePage}>{i}</button>)
		}

		return (
			<div className="content__nav">
				<div id="nav_list" className={"content__nav__list "+list_class}>
					{nav_items}
				</div>
			</div>
		)	
	}
}

export default ListNav