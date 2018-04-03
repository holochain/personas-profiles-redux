
import { connect } from 'react-redux'
import ProfileForm from '../components/profile'
import {
  register
} from '../actions'




const mapStateToProps = state => {
  return {
    profileHash: state.profile.profileHash,
    profile: state.profile.profile,
    profileMapping: state.profile.profileMapping
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfileMapping: (mapping) => {
      dispatch(createProfile(mapping))
      dispatch(createProfileMapping(mapping))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
