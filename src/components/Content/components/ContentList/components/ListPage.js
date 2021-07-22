import React, {PureComponent} from 'react'

import {buildGETString} from 'functions.js';

import DonorsItem from './DonorsItem'
import PrayerItem from './PrayerItem'
import BricksItem from './BricksItem'

class ListPage extends PureComponent {
	constructor(props) {
		super(props)

		this.deleteItem = this.deleteItem.bind(this)

		this.state = {
			deleted: []
		}
	} 

	deleteItem(id) {
		let respons = buildGETString('delete_item', {
			type : this.props.main_tab,
			id   : id,
		})

		fetch(respons, {
			method: "GET",
		})
		.then(resp => {return resp.json()})
		.then(resBody => {
			let deleted = this.state.deleted.slice(0)
			deleted.push(id)

			this.setState({
				deleted: deleted
			})
		})
	}

	render() {
		return (
			<div className="content__list__page" data-page={this.props.page}>
				{this.props.data.map((elem, i) => {    

					if(this.state.deleted.indexOf(elem.id) < 0 || this.props.show_deleted == true) { 
						let data = {}
						Object.assign(data, elem)

						if(this.state.deleted.indexOf(elem.id) >= 0) {
							data.status = 5;
						}

						if(this.props.main_tab == 'donate') {
							return (
								<DonorsItem key={elem.id} data={data} selected={this.props.selected} setSelected={this.props.setSelected} deleteItem={this.deleteItem} setMode={this.props.setMode} setSearchValue={this.props.setSearchValue}/>
							) 
						} else if(this.props.main_tab == 'prayer') {
							return (
								<PrayerItem key={elem.id} data={data} selected={this.props.selected} setSelected={this.props.setSelected} deleteItem={this.deleteItem} setMode={this.props.setMode} setSearchValue={this.props.setSearchValue}/>
							) 
						} else if(this.props.main_tab == 'bricks') {
							return (
								<BricksItem key={elem.id} data={data} selected={this.props.selected} setSelected={this.props.setSelected} deleteItem={this.deleteItem} setMode={this.props.setMode} setSearchValue={this.props.setSearchValue}/>
							) 
						}
					}
				})}
			</div>
		)	
	}
}

export default ListPage