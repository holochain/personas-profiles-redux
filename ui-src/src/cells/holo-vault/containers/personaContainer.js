
import { connect } from 'react-redux'
import PersonaForm from '../components/persona/persona'
import {
  personaCreate
} from '../actions'

const mapStateToProps = state => {
  return {
    persona: state.profile.persona
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personaCreate: (mapping) => {
      dispatch(personaCreate(mapping))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonaForm)
