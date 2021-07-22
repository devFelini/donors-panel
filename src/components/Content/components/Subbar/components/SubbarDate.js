import React, {Component, PureComponent} from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

class SubbarDate extends PureComponent {
	constructor(props) {
		super(props)

		this.changeFilters = this.changeFilters.bind(this);
		this.standartFilters = this.standartFilters.bind(this);
		this.state ={
			start: new Date(),
			end: new Date(),
		}
	}

	componentDidMount() {
		this.setState({ 
			start: new Date(this.props.period.curr.start.valueOf()),
			end: new Date(this.props.period.curr.end.valueOf()),
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.period.curr.start != this.props.period.curr.start || prevProps.period.curr.end != this.props.period.curr.end) {
			this.setState({ 
				start: new Date(this.props.period.curr.start.valueOf()),
				end: new Date(this.props.period.curr.end.valueOf()),
			})
		}
	}

	changeFilters(data) {
		this.props.setTimePeriod({start: data[0].valueOf(), end: data[1].valueOf()})
	}

	standartFilters(type) {
		let end = this.props.period.default.end.valueOf()
		let start = this.props.period.default.start.valueOf()
		
		if(type == 'one_day') {
			start = end
		}

		this.props.setTimePeriod({start: start, end: end});
	}

	render() {
		let one_day_class = ''
		let all_class = ''

		console.log(this.props.period.curr.end.valueOf(), this.props.period.default.end.valueOf())
		if(this.props.period.curr.end.valueOf() == this.props.period.default.end.valueOf()) {

			if(this.props.period.curr.start.valueOf() == this.props.period.default.start.valueOf()) {
				all_class = 'active'
			} else if(this.props.period.curr.start.valueOf() == this.props.period.default.end.valueOf()) {
				one_day_class = 'active'
			}
		}
		return (
			<div className="subbar__widget subbar__date"> 
				<div className="subbar__widget__head">
					<span>Дата</span>
					<div className="subbar__date__buttons">
						<button className={one_day_class} onClick={(e) => this.standartFilters('one_day')}>24ч</button>
						<button className={all_class} onClick={(e) => this.standartFilters('all')}>Все</button>
					</div>
				</div>
				<div className="subbar__date__content">
					<DateRangePicker value={[this.state.start, this.state.end]} clearIcon={null} onChange={(e) => this.changeFilters(e)} />
				</div>
        	</div>
		)	
	}
}

export default SubbarDate