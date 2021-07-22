import React, {PureComponent} from 'react'
import Sidebar from './components/Sidebar/index'

import Content  from './components/Content/index'
import Reports  from './components/Reports/index'
import Settings from './components/Settings/index'

import './style.css'

import $ from 'jquery'

class App extends PureComponent {
  constructor(props, context) {
    super(props, context)

    this.setMode     = this.setMode.bind(this)
    this.setSelected = this.setSelected.bind(this)
    this.setMainTab  = this.setMainTab.bind(this)
    this.displayTab  = this.displayTab.bind(this)

    this.state = {
      main_tab: 'donate',
      mode: 'list',
      form_mode: 'add',
      pages_data: '',
      selected: [], 
      tabs: {
        donate: 'Пожертвования',
        prayer: 'Записки',
        bricks: 'Кирпичи',
        report: 'Отчеты',
        settings: 'Настройки'
      }    
    }

    global.queryAddress = 'http://green.devkater.ru/tree.php'
    global.contentItemsPerPage = 20
    global.reportsItemsPerPage = 30
  }

  componentWillMount() {
    let data = require('data/MenuData.json')
    this.setState({
      pages_data: data,
    })
  }

  componentDidMount() {
    let path = window.location.pathname.split('/')
    
    if(path[1]) {
      this.setMainTab(path[1], false)
    } else {
      this.setMainTab('donate', true)
    }
  }

  setMainTab(value, set_history) {
    let path = '/'+value

    if(set_history) {
      window.history.pushState({route: path}, "Админ панель", path)
    }
    
    $('head link[rel="icon"]').attr('href', '/assets/images/favicons/'+value+'.png')
    $('head title').text(this.state.tabs[value]);
    let mode = this.state.mode
    if(this.state.form_mode == 'edit') {
      mode = 'list'
    }
    
		this.setState({
			main_tab: value,
      selected: [],
      mode: mode  
		})

    
	}
  
  setMode(mode) {
    let sate_date = {}

    if(mode.form) {
      sate_date.form_mode = mode.form
    } 
    
    if(mode.content) {
      sate_date.mode = mode.content
    } 

    if(mode.selected) {
      sate_date.selected = mode.selected
    } 

    this.setState(sate_date)
	}

  setSelected(selected) {
    this.setState({
      selected: selected,
    })
  }
  
  displayTab(type) {
    if(type == 'donate' || type == 'prayer' || type == 'bricks') {
      return (
        <Content 
            main_tab={this.state.main_tab} 
            page_data={this.state.pages_data[this.state.main_tab]} 
            mode={this.state.mode}
            form_mode={this.state.form_mode}
            selected={this.state.selected}

            setSelected={this.setSelected}
            setMode={this.setMode}
          />
      )
    } else if(type == 'report') {
      return ( 
        <Reports />
      )
    } else if(type == 'settings') {
      return ( 
        <Settings />
      )
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Sidebar main_tab={this.state.main_tab} setMainTab={this.setMainTab} />
          {this.displayTab(this.state.main_tab)}
        </div>
      </div>
    )
  }
}

export default App;
