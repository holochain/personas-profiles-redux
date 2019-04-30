import { connect } from 'react-redux'
import LoginForm, { Props, StateProps, DispatchProps, RouterProps } from '../components/login/login'
import { Dispatch } from 'redux'
import {
  Login
} from '../actions'

const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {
  return {
    title: `Login`
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (loginSpec) => dispatch(Login.create({ spec: loginSpec }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
