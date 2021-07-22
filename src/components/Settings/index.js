import React, {Component} from 'react'
import {buildGETString} from 'functions.js';
class Settings extends Component {
	constructor(props) {
		super(props)

		this.changeFieldData = this.changeFieldData.bind(this)

		this.state = {
			loading: false,
			data: {}
		}
	}

	changeFieldData(input, field) {
		let data = {}

		Object.assign(data, this.state.data)

		data[field] = input.target.value
		
		console.log(data)

		this.setState({
			data: data,
		})
	}

	getData() {
		this.setState({ loading: true })

		let respons = buildGETString('get_settings', {})
	
		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {

			this.setState({
				data: resBody,
				loading: false,
			})
		})
	}

	updateData() {
		this.setState({ loading: true })

		let respons = buildGETString('update_settings', this.state.data)

		console.log(respons)

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {

			this.setState({
				data: resBody,
				loading: false,
			})
		})
	}

	componentDidMount() {
		this.getData()
	}

	render() {
		return (
			<div className="content__form content__form_settings">
				<div id="subbar" className="subbar">
					<div className="subbar__copyright">
						<p>Панель управления пожертвованиями для сайта <a href="https://xn----8sbedalbxckj1anejwmjiu3qxa.xn--p1ai/" target="_blank">георгиевский-монастырь.рф</a>.</p>
						<p>Разработал в 2021 году <br/>Линик Федор Сергеевич.</p>
					</div>
				</div>
				<div className="content__form__wrap">
					<div class="content__head">
						<h2 class="title">Настройки</h2>
						<div class="content__head__buttons">
							<button class="btn btn_green" onClick={(e) => this.updateData()}>Сохранить</button>
						</div>
					</div>
					<div className="settings__form__inner form">
						<div className="settings__form__col">
							<div className="content__form__item">
								<label>
									<div className="content__form__label">Ссылка на генерацию сертификата</div>
									<div className="settings__sert-generator">
										<input type="text" name="sert_generator" value={this.state.data.sert_generator} placeholder="Ссылка на генерацию сертификата"/>
										<button className="btn btn_green">Тест</button>
									</div>
								</label>									
							</div>
						</div>	
						<div className="settings__form__col">
							<div className="settings__form__index">
								<div className="settings__form__index__head">
									<h3 className="title">Порядковые номера</h3>	
								</div>
								<div className="content__form__item">
									<label>
										<div className="content__form__label">Номер записок</div>
										<input type="number" name="prayer_num" onChange={(e) => this.changeFieldData(e, 'prayer_num')} value={Number(this.state.data.prayer_num)} placeholder="Номер записок"/>
									</label>									
								</div>
								<div className="content__form__item">
									<label>
										<div className="content__form__label">Номер сертификатов</div>
										<input type="number" name="brick_num" onChange={(e) => this.changeFieldData(e, 'brick_num')} value={Number(this.state.data.brick_num)} placeholder="Номер сертификатов"/>
									</label>									
								</div>
							</div>	
						</div>	
					</div>	
				</div>
			</div>
		)	
	}

}

export default Settings