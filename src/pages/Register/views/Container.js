import { connect } from 'react-redux'
import Register from './Register'
import './style.scss'

const Container = connect()(Register)

export { Container as View }
