import React, {Component, PureComponent} from 'react'


class SubbarLive extends PureComponent {
	constructor(props) {
		super(props)

		this.setLiveFilter = this.setLiveFilter.bind(this);
		this.defaultFilters = this.defaultFilters.bind(this);
	}

	setLiveFilter(type) {
		let live = false

		if(!type || type != this.props.live) {
			live = type
		}

		console.log(live)
		this.props.setQueryFilter({live: live})
	}

	defaultFilters() {
		this.props.setQueryFilter({live: false})
	}

	render() {
		let head_buttons = ''
		let class_live = ''
		let class_die = ''
		
		if(this.props.live == 'live') {
			class_live = 'active'
		} else if(this.props.live == 'die') {
			class_die = 'active'
		}

		if(this.props.live) {
			head_buttons = <button className="subbar__widget__close" onClick={this.defaultFilters}><div></div></button>
		}

		return (
			<div className="subbar__widget subbar__live"> 
				<div className="subbar__widget__head">
					<span>Поминовение</span>
					{head_buttons}
				</div>
				<div className="subbar__live__content">
					<button className={"subbar__live__btn "+class_live} onClick={(e) => this.setLiveFilter('live')}>О зравии</button>
					<button className={"subbar__live__btn "+class_die}  onClick={(e) => this.setLiveFilter('die')}>Об упокоении</button>
				</div>
        	</div>
		)	
	}

}

export default SubbarLive