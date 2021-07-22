import React, {PureComponent} from 'react'

import {GenerateArt, buildGETString, StatusIcon} from 'functions';

import Select from 'react-select-me';

import DateTimePicker from 'react-datetime-picker';
import InfoBar  from './components/InfoBar';
import FormHead from './components/FormHead';
import FormSubbar from './components/FormSubbar/index';

class ContentForm extends PureComponent {
	constructor(props) {
		super(props)

		this.saveItem = this.saveItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.getItemData = this.getItemData.bind(this);
		this.changeFieldData = this.changeFieldData.bind(this);
		this.changeSelectData = this.changeSelectData.bind(this);
		this.changeDatepicerData = this.changeDatepicerData.bind(this);
		this.selectActions = this.selectActions.bind(this);

		this.state = {
			loading: false,
			options: {
				live: [
					{value: 1, label: 'О здравии'},
					{value: 0, label: 'Об упокоении'},
				],
				status: [
					{value: 1, label: 'Успешный'     },
					{value: 0, label: 'Незавершенный'},
					{value: 2, label: 'Ошибочный'    },
					{value: 5, label: 'Удаленный'    },	
				],
				prayers: [
					{label: 'Литургия',    value: 491,  live: [0,1], period: [1, 40]},
					{label: 'Проскомидия', value: 490,  live: [0,1], period: [1, 40]},
					{label: 'Псалтирь',    value: 492,  live: [0,1], period: [40, 182, 365]},
					{label: 'Панихида',    value: 493,  live: [0],   period: [1]},
					{label: 'Молебен',     value: 1935, live: [1],   period: [1]},
					{label: 'Акафист',     value: 1936, live: [1],   period: [40, 182, 365]},
				],
				period: [
					{value: 1,   label: 'Разовое поминовение (1 день)'},
					{value: 40,  label: 'Сорокоуст (40 дней)'},
					{value: 182, label: 'Шесть месяцев'},
					{value: 365, label: 'Один год'},
				]
			},
			data: {
				id: false,
				name: '',
				email: '',
				time: new Date(),
				price: 0,
				status: 0,
				live: 1,
				prayer: 490,
				period: 1,
				art: GenerateArt(),
				number: 0
			},
			actions: []
		}

	}
	
	saveItem() {
		if(this.state.data.email != null && this.state.data.email != '' && this.state.data.price != null && this.state.data.price > 0) {
			this.setState({ loading: true });

			let params = {
				type   : this.props.main_tab,
				name   : this.state.data.name,
				email  : this.state.data.email,
				price  : this.state.data.price,
				time   : new Date(this.state.data.time).getTime()/1000,
				status : this.state.data.status,
				art    : this.state.data.art,
			}	

			let action = 'add_item'
			if(this.state.data.id) {
				action = 'update_item'
				params.id = this.state.data.id
			}

			if(this.props.main_tab == 'prayer') {
				params.prayer = this.state.data.prayer;
				params.period = this.state.data.period;
				params.live   = this.state.data.live;
			} 
			
			if(this.props.main_tab == 'bricks') { 
				params.live   = this.state.data.live;
				params.number = this.state.data.number;
			}

			if(this.state.actions.length > 0) {
				params.actions = this.state.actions.join(',')
			}

			let respons = buildGETString(action, params)

			console.log(respons);

			fetch(respons, {
				method: "GET",
			})
			.then(resp => {return resp.json()})
			.then(resBody => {
				this.props.setMode({content: 'list', form: 'add', selected: []});
				if(this.state.actions.indexOf('open_sert') >= 0) {
					window.open(resBody.result, '_blank');
				}
			})
		} else {
			let data = {}
			Object.assign(data, this.state.data)

			if(this.state.data.email == '') {
				data.email = null
			}

			if(this.state.data.price <= 0) {
				data.price = null
			}

			this.setState({
				data: data
			})
		}
	}

	deleteItem(id) {
		if(id) {
			let respons = buildGETString('delete_item', {
				type : this.props.main_tab,
				id   : id,
			})
			
			console.log(respons)

			fetch(respons, {
				method: "GET",
			})
			.then(resp => {return resp.json()})
			.then(resBody => {
				this.props.setMode({content: 'list', form: 'add', selected: []});
			})
		}
	}

	getItemData(type, id) {
		let respons = buildGETString('get_item', {
			type : type,
			id   : id,
		})
	
		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {
			let data = {}

			Object.assign(data, this.state.data)
			
			data.id     = id 
			data.art    = resBody.art
			data.price  = resBody.price
			data.email  = resBody.email
			data.time   = new Date(resBody.time * 1000)
				data.status = Number(resBody.status)
			if(this.props.main_tab == 'donate') {
				data.name   = resBody.name
				
			} else {
				data.name   = resBody.names
				data.live   = Number(resBody.live)
				data.pos    = resBody.pos

				if(this.props.main_tab == 'prayer') {
					data.prayer = Number(resBody.type)
					data.period = Number(resBody.period)
				} else {
					data.number = resBody.number
				}
			}

			this.setState({
				data: data,
			})
		})
	}

	changeFieldData(input, field) {
		let data = {}

		Object.assign(data, this.state.data)

		if(field == 'price') {
			if(Number(input.target.value) > 0) {
				data[field] = Number(input.target.value)
			} else {
				data[field] = null
			}
		} else if(field == 'email') {
			let email_pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i

			if(input.target.value == '' || input.target.value.search(email_pattern) != 0) {
				data[field] = null
			} else {
				data[field] = input.target.value
			}
		} else {
			data[field] = input.target.value
		}

		this.setState({
			data: data,
		})
	}

	changeSelectData(input, field) {
		let data = {}
		Object.assign(data, this.state.data)

		data[field] = input.value

		if(field == 'prayer') {
			let prayer_data = this.state.options.prayers.find(item => item.value === input.value)

			data['live']   = prayer_data.live[0]
			data['period'] = prayer_data.period[0]

		}

		if(field == 'status') {
			this.setState({
				data: data,
				actions: []
			})
		} else {
			this.setState({
				data: data,
			})
		}
	}

	changeDatepicerData(input, field) {
		let data = {}

		Object.assign(data, this.state.data)
		
		if(input == null) {
			data[field] = new Date()
		} else {
			data[field] = input
		}

		this.setState({
			data: data,
		})
	}

	selectActions(actions) {
		this.setState({
			actions: actions,
		})
	}

	iconRenderer() {
		return (
			<div className="dd__expandIcon"></div>
		)
	}

	componentDidMount() {
		let status = []
		this.state.options.status.map((elem, i) => { 
			let status_icon = StatusIcon(elem.value)
			status.push({value: elem.value, label: <div className="dd__selectControl__label"><div className={'status-icon '+status_icon.className}><div className={status_icon.icon}></div></div>{elem.label}</div>})
		})

		let options = {}
		Object.assign(options, this.state.options)
		options.status = status

		this.setState({
			options: options,
		})

		if(this.props.form_mode == 'edit') {
			this.getItemData(this.props.main_tab, this.props.selected[0])
		}
	}

	render() {
		let addit_fields = []

		let prayer_value = this.state.options.prayers.find(prayer => prayer.value == this.state.data.prayer)

		if(this.props.main_tab == 'prayer') {
			addit_fields.push(<div className="content__form__item content__form__item-1-2"><Select options={this.state.options.prayers} value={prayer_value} onChange={(e) => this.changeSelectData(e, 'prayer')} iconRenderer={this.iconRenderer} /></div>)
			if(prayer_value.period.length > 1) {
				let period_value = this.state.options.period.find(period => period.value == this.state.data.period)
				addit_fields.push(<div className="content__form__item content__form__item-1-2"><Select options={this.state.options.period}  value={period_value} onChange={(e) => this.changeSelectData(e, 'period')} iconRenderer={this.iconRenderer} /></div>)
			}
		}

		if(this.props.main_tab == 'prayer' || this.props.main_tab == 'bricks') {
			if(prayer_value.live.length > 1) {
				let live_value = this.state.options.live.find(live => live.value == this.state.data.live)
				addit_fields.push(<div className="content__form__item content__form__item-1-2"><Select options={this.state.options.live} value={live_value} onChange={(e) => this.changeSelectData(e, 'live')} iconRenderer={this.iconRenderer} /></div>)
			}
		}

		let class_name = ''
		if(this.state.data.name == null) {
			class_name = 'error'
		}
		let class_email = ''
		if(this.state.data.email == null) {
			class_email = 'error'
		}
		let class_price = ''
		if(this.state.data.price == null) {
			class_price = 'error'
		}

		let status_value = this.state.options.status.find(status => status.value === this.state.data.status)

		let infobar = ''
		if(this.props.form_mode == 'edit') {
			infobar = <InfoBar id={this.state.data.id} pos={this.state.data.pos} number={this.state.data.number} art={this.state.data.art} />
		}

		return (
			<div className="content__form">
				<FormSubbar main_tab={this.props.main_tab} mode={this.props.form_mode} actions={this.state.actions} status={this.state.data.status} id={this.state.data.id} selectActions={this.selectActions} deleteItem={this.deleteItem}/>
				<div className="content__form__wrap">
					<FormHead mode={this.props.form_mode} type={this.props.main_tab} setMode={this.props.setMode} saveItem={this.saveItem}/>
					{infobar}
					<div className="content__form__inner form">
						<div className="content__form__row">
							<div className="content__form__item content__form__item-1-2">
								<input type="text" name="name" placeholder="Имя" onChange={(e) => this.changeFieldData(e, 'name')} className={class_name} value={this.state.data.name}/>
								</div>
							<div className="content__form__item content__form__item-1-2">
								<input type="email" name="email" placeholder="Email" onChange={(e) => this.changeFieldData(e, 'email')} className={class_email} value={this.state.data.email}/>
							</div>
							<div className="content__form__item content__form__item-1-2">
								<DateTimePicker disableClock={true} format="dd.MM.y HH:mm" onChange={(e) => this.changeDatepicerData(e, 'time')} value={this.state.data.time} />
							</div>
							<div className="content__form__item content__form__item-1-2">
								<input type="number" name="price" placeholder="Сумма" onChange={(e) => this.changeFieldData(e, 'price')} className={class_price} value={this.state.data.price}/>
							</div>
							{addit_fields}
							<div className="content__form__item content__form__item-1-2">
								<Select options={this.state.options.status} value={status_value} onChange={(e) => this.changeSelectData(e, 'status')} iconRenderer={this.iconRenderer} />
							</div>
						</div>	
					</div>
				</div>
			</div>
		)	 
	}

}

export default ContentForm