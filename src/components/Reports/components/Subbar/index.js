import React, {Component, PureComponent} from 'react'


class ReportsSubbar extends Component {
	constructor(props) {
		super(props)

		this.openPage = this.openPage.bind(this)

		this.state = {
			data: [
				{id: 'diagram',      title: 'Диаграмма пожертвований'},
				{id: 'stat_daily',   title: 'Статистика по дням'},
				{id: 'stat_monthly', title: 'Статистика по месяцам'},
			]
		}
	}

	openPage(e, id) {
		e.preventDefault()
		this.props.setCurrPage(id)
	}

	render() {
		return (
			<div id="subbar" className="subbar">
				<div className="subbar__widgets">
					<div className="subbar__widget subbar__menu">
						<ul>
							{this.state.data.map((elem, i) => { 

								let active_class = ''

								if(this.props.curr_page == elem.id) {
									active_class = 'active'
								}

								return (
									<li>
										<a href={"/report/"+elem.id} key={elem.id} className={active_class} onClick={(e) => this.openPage(e, elem.id)}>{elem.title}</a>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>	
		)	
	}

}

export default ReportsSubbar