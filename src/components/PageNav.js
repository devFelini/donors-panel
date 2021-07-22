import React, {PureComponent} from 'react'
import $ from 'jquery'

class PageNav extends PureComponent {
	constructor(props) {
		super(props)
 
		this.changePage       = this.changePage.bind(this)
		this.setMaxMinNumbers = this.setMaxMinNumbers.bind(this)
		// this.animatedSelect   = this.animatedSelect.bind(this)

		this.state = {
			min_page: 1,
			max_page: 5,
		}
	}

	changePage(btn) {
		let next = btn.target.getAttribute('data-value')
		this.props.setCurrentPage(Number(next));
	}

	setMaxMinNumbers(prev_page) {
		let min = prev_page
		let max = prev_page

		let buttons_count = 8;

		while(min > 1 && buttons_count > 4) {
			min--; buttons_count--;
		}

		while(max < this.props.pages.count && buttons_count > 0) {
			max++; buttons_count--;
		}
		
		this.setState({
			max_page: max,
			min_page: min,
		})

	}

	animatedSelect(prev_page) {
		let nav_list = $('#nav_list')
		let next_page = this.props.pages.current

		if(!prev_page) { prev_page = 1 }

		if(prev_page !== next_page) {
			let mergin_default
			if(prev_page < 4) {
				mergin_default = 0
			} else if(prev_page == 4) {
				mergin_default = -42
			} else {
				mergin_default = -84
			}

			nav_list.css({marginLeft: mergin_default+'px'})

			if(next_page > 3 || prev_page > 3) {
				let move_btn = prev_page - next_page

				if((next_page == 4 && prev_page < 3) || (next_page == 2  && prev_page > 3)) { 
					if(move_btn > 1) { move_btn = 1 } else if(move_btn < -1) { move_btn = -1 }
				} else {
					if(move_btn > 2) { move_btn = 2 } else if(move_btn < -2) { move_btn = -2 }
				}

				nav_list.animate({marginLeft: (mergin_default + (move_btn) * 42) + 'px'}, 300)
			}	
		} 

		setTimeout(function() {
			nav_list.find('.page-nav__btn[data-value="'+next_page+'"]').addClass('active').siblings().removeClass('active')
		}.bind(this), 300);
		
	}


	componentDidMount() {
		this.setMaxMinNumbers()
		this.animatedSelect(1)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.pages.current !== this.props.pages.current || prevProps.pages.count !== this.props.pages.count) {
			if(prevProps.pages.current) {
				this.setMaxMinNumbers(prevProps.pages.current)
				this.animatedSelect(prevProps.pages.current)
			} else {
				this.setMaxMinNumbers(1)
				this.animatedSelect(1)
			}
		}
	} 

	render() {
		let nav_items = []

		for (var i = this.state.min_page; i <= this.state.max_page; i++) {

			nav_items.push(<button key={i} className="page-nav__btn" data-value={i} onClick={this.changePage}>{i}</button>)
		}

		
		return (
			<div className="page-nav">
				<div id="nav_list" className="page-nav__list">
					{nav_items}
				</div>
			</div>
		)	
	}
}

export default PageNav