
import { connect } from 'react-redux'
import ProfileForm from '../components/profile/profile'
import {
  personaCreate,
  profileMappingCreate
} from '../actions'




const mapStateToProps = state => {
  return {
    profileHash: state.profile.profileHash,
    profile: state.profile.profile,
    profileMapping: state.profile.profileMapping,
    profileSpec: state.profile.profileSpec,
    personas: state.profile.personas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personaCreate: (mapping) => {
      dispatch(personaCreate(mapping))
    },
    profileMappingCreate: (mapping) => {
      dispatch(profileMappingCreate(mapping))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
