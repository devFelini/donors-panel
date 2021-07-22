import React, {PureComponent} from 'react'

class ListHead extends PureComponent {
	constructor(props) {
		super(props)

		this.setSortField = this.setSortField.bind(this);
		this.state = {
			fields: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.setState({
			fields: this.props.data_fields[this.props.main_tab]
		})
	}

	setSortField(slug, order) {
		let set_order = "DESC"
		if(order === 'DESC') {
			set_order = "ASC"
		}
		
		this.props.setListOrder(slug, set_order)
	}

	
	render() {
		return (
			<div className={"content__list__head content__list__head_"+this.props.main_tab+" icon_arrow"}>
				
				{this.state.fields.map((elem, i) => {   
					let btn_class = '';

					if(elem.slug === this.props.sort.field) {
						btn_class = this.props.sort.order;
					} 
					return (
						<div key={elem.slug} className={"content__list__sort content__list__sort_"+elem.class}>
							<button className={"content__list__sort__btn "+btn_class} onClick={(e) => this.setSortField(elem.slug, btn_class)}>
								<span>{elem.title}</span>
								<div className="content__list__sort__arrows"></div>
							</button>
						</div>
					) 
				})}
			</div>
		)	
	}
}

export default ListHead