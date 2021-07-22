import React, {Component} from 'react'
import {FormatedPrice, FormatedDate, StatusIcon} from 'functions.js';

import ItemActions from './ItemActions'

class BricksItem extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		let sert = ''
		let status = StatusIcon(this.props.data.status)
		let item_class = ''

		if(this.props.data.status == 1) {
			let sert_link = 'http://xn----8sbedalbxckj1anejwmjiu3qxa.xn--p1ai/pdfgenerator/sert_custom.php?num='+this.props.data.number+'&names='+this.props.data.names
			sert = <div><a href={sert_link} target="_blank" className="content__item__info__sert__link icon_docs">{this.props.data.number}</a></div>
		} else if(this.props.data.status == 5) {
			item_class = 'deleted'
		}

		if(this.props.selected.indexOf(this.props.data.id) != -1) {
			item_class += ' selected'
		}

		return (
			<div className={"content__item item content__item-prayer "+item_class}>
				<div className="content__item__info">
					<div className="content__item__info__id">
						<div className={'status-icon '+status.className}><div className={status.icon}></div></div>
						<div className="content__item__info__id__num">{this.props.data.id}</div>
					</div>
					<div className="content__item__info__user">
						<div className="content__item__info__name">{this.props.data.names}</div>
						<button className="content__item__info__email" onClick={(e) => this.props.setSearchValue(this.props.data.email)} data-email={this.props.data.email}>{this.props.data.email}</button>
					</div>
					<div className="content__item__info__sert">{sert}{this.props.data.prayer_label}</div>	
					<div className="content__item__info__price">{FormatedPrice(this.props.data.price)} p</div>
					<div className="content__item__info__date"><div className="icon_calendar">{FormatedDate(this.props.data.time)}</div></div>
				</div>
				<ItemActions id={this.props.data.id} status={this.props.data.status} selected={this.props.selected} setSelected={this.props.setSelected} setMode={this.props.setMode} deleteItem={this.props.deleteItem}/>
			</div>
		)	
	}
}

export default BricksItem