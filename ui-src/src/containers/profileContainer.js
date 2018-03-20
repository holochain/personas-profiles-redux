
import { connect } from 'react-redux'
import ProfileForm from '../components/profile'
import {
  register
} from '../actions'




const mapStateToProps = state => {
  return {
    profileHash: state.profile.profileHash,
    profile: state.profile.profile,
    mapping: state.profile.mapping
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (profile) => {
      dispatch(register(profile))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
