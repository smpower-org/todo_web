import { connect } from 'react-redux'
import Counter from './Counter'

const mapStateToProps = (state, ownProps) => ({
  counter: state.counter
})

const Container = connect(mapStateToProps)(Counter)

export { Container as View }
