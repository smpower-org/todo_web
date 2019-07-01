import { connect } from 'react-redux'
import Home from './Home'
import './style.scss'

const mapStateToProps = (state, ownProps) => ({ login: state.login })

const Container = connect(mapStateToProps)(Home)

export { Container as View }
