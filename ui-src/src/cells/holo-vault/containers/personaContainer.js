
import { connect } from 'react-redux'
import PersonaForm from '../components/persona/persona'
import {
  personaCreate
} from '../actions'

const mapStateToProps = (state, ownProps) => {
  const personaName = ownProps.match.params.name
  let persona = state.profile.personas.filter(function (persona){
    return personaName === persona.name
  })[0]
  return {
    title: `Persona - ${personaName}`,
    persona: persona
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
