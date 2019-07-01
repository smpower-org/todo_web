import { connect } from 'react-redux'
import Login from './Login'
import './style.scss'

const Container = connect()(Login)

export { Container as View }
