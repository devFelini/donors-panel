import React, {Component, PureComponent} from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

class ReportsDiagramUpdate extends PureComponent {

	constructor(props) {
		super(props)
	}

	render() {
		let btn_class = ''
		if(this.props.loading && this.props.update) {
			btn_class = 'loading'
		}

		return ( 
			<div className="reports__diagram__update-data">
				<button className={"reports__diagram__update-data__btn btn "+btn_class} onClick={this.props.setUpdateMode}><span className="icon_update">Актуализировать данные</span></button>
			</div>
		)	
	}
}

export default ReportsDiagramUpdate