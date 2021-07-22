import React, {PureComponent} from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {getDiagramMaxValue} from 'functions'
import $ from 'jquery'

class ReportsDiagramVisual extends PureComponent {

	constructor(props) {
		super(props)

		this.setDiagramSize = this.setDiagramSize.bind(this)
		this.linesBuilder   = this.linesBuilder.bind(this)
		this.showNotFound   = this.showNotFound.bind(this)
		this.showDayStat    = this.showDayStat.bind(this)

		this.state = {
			diagram: {
				width: 700,
				height: 400,
			},
			data: [
				{id: 'donate',  label: 'Пожертвования', color: '#2F6E4A'},
				{id: 'prayers', label: 'Записки',       color: '#F8DE04'},
				{id: 'bricks',  label: 'Кирпичи',       color: '#4E1DCC'}
			]
		}
	}

	setDiagramSize() {
		if($('div').is('#visual')) {
			this.setState({
				diagram: {
					width:  $('#visual').offsetWidth + 30,
					height: $('#visual').offsetHeight,
				}
			})
		}
	}

	componentDidMount() {
		this.setDiagramSize()

		window.addEventListener("resize", this.setDiagramSize);
		$(window).on("resize", this.setDiagramSize);
	} 

	componentWillUnmount() {
		window.removeEventListener("resize", this.setDiagramSize)
	}

	linesBuilder() {
		let unit = ''

		if(this.props.info == 'count') {
			unit = ' шт.'
		} else {
			unit = ' руб.'
		}
		let result = []
		if(this.props.types.length > 1) {
			this.state.data.map((elem, i) => { 
				if(this.props.types.find(item  => item == elem.id)) {
					result.push(<Area type="monotone" dataKey={elem.id+"_"+this.props.status} name={elem.label} unit={unit} stroke={elem.color} fillOpacity={1} fill={"url(#color_"+elem.id+")"}/>)
				}
			})
		} else {
			this.state.data.map((elem, i) => { 
				if(this.props.types.find(item  => item == elem.id)) {
					result.push(<Area type="monotone" dataKey={elem.id+"_p"} name="Все"       unit={unit} stroke="#D1D1D1" fillOpacity={1} fill={"url(#color_grey)"}/>)
					result.push(<Area type="monotone" dataKey={elem.id+"_s"} name="Успешные"  unit={unit} stroke={elem.color} fillOpacity={1} fill={"url(#color_"+elem.id+")"}/>)
					result.push(<Area type="monotone" dataKey={elem.id+"_e"} name="Ошибочные" unit={unit} stroke="#EF4545" fillOpacity={1} fill={"url(#color_red)"}/>)
				}
			})
		}
		return result
	}

	showNotFound(length) {
		if(length == 0) {
			return (
				<div className="reports__diagram__not-found"><span>Нет данных за указанный период</span></div>
			)
		} else {
			return ''
		}
	}

	showDayStat(value) {
		if(value.activeLabel != null && value.activeLabel != null && value.activeLabel.length == 10) {
			let date_arrey = value.activeLabel.split('.');
			let date = [new Date(date_arrey[2]+"-"+date_arrey[1]+"-"+date_arrey[0]), new Date(date_arrey[2]+"-"+date_arrey[1]+"-"+date_arrey[0])]

			this.props.changePeriod(date)
		}
	}

	render() {

		let lines = this.linesBuilder()

		let y_domain = [0, 'auto']
		if(this.props.info != 'average_summ') {
			y_domain = [0, getDiagramMaxValue(this.props.data, this.props.types, this.props.status)]
		}

		return (
			<div id="visual" className="reports__diagram__visual">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart onClick={(e) => this.showDayStat(e)}
						width={this.state.diagram.width-30}
						height={this.state.diagram.height}
						data={this.props.data} 
						stackOffset="expand"
						// baseValue="dataMin"
						margin={{
							top: 5,
							right: 30,
							left: 30,
							bottom: 0, 
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<defs>
							{this.state.data.map((elem, i) => { 
								if(this.props.types.find(item  => item == elem.id)) {
									return (
										<linearGradient id={"color_"+elem.id} x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor={elem.color} stopOpacity={0.8}/>
											<stop offset="95%" stopColor={elem.color} stopOpacity={0}/>
										</linearGradient>
									)
								}
							})}
							<linearGradient id="color_grey" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#D1D1D1" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#D1D1D1" stopOpacity={0}/>
							</linearGradient>
							<linearGradient id="color_red" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#EF4545" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#EF4545" stopOpacity={0}/>
							</linearGradient>
						</defs>
						<XAxis dataKey="name"/>
						<YAxis domain={y_domain} />
						<Tooltip/>
						{lines}
					</AreaChart>
				</ResponsiveContainer>
				{this.showNotFound(this.props.data.length)}
			</div>
		)	
	}
}

export default ReportsDiagramVisual