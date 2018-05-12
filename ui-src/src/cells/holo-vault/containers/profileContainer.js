
import { connect } from 'react-redux'
import ProfileForm from '../components/profile/profile'
import {
  personaCreate,
  profileMappingCreate
} from '../actions'



const mapStateToProps = (state, ownProps) => {
  const profileName = ownProps.match.params.name
  let selectedProfile = state.profile.profiles.filter(function (profile){
    return profileName === profile.name
  })[0]
  return {
    profileHash: state.profile.profileHash,
    profile: selectedProfile,
    mapping: selectedProfile.mapping,
    profileSpec: selectedProfile.profileSpec,
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
