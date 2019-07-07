import React from 'react'
import Loading from './Loading'
import './style.scss'

class Boundle extends React.Component {
  state = { mod: null }

  load = props => {
    this.setState({ mod: null })

    props.load().then(mod => {
      this.setState({
	      mod: mod.View ? mod.View : Loading
      });
    }).catch(error => {
      throw new Error('加载组件失败！')
    })
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  render() {
    console.log(this.state)
    return this.state.mod 
      ? this.props.children(this.state.mod) 
      : this.props.children(Loading)
  }
}

export { Boundle as View }
