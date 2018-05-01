
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

  //use the mapping to find the values, combine the values with the spec
  let profile = selectedProfile.profileSpec
  selectedProfile.profileSpec.profile[0].value = '@philt3r'
  selectedProfile.profileSpec.profile[1].value = 'Phil'
  selectedProfile.profileSpec.profile[2].value = 'BB'

  console.log(profile)

  return {
    profileHash: state.profile.profileHash,
    mapping: selectedProfile.mapping,
    profileSpec: profile,
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
