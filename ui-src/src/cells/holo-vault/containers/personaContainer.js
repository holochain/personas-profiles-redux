
import { connect } from 'react-redux'
import PersonaForm from '../components/persona/persona'
import {
  personaCreate,
  personaUpdate
} from '../actions'

const mapStateToProps = (state, ownProps) => {
  let buttonText = 'Update Persona'
  const personaName = ownProps.match.params.name
  let filteredPersona = state.profile.personas.filter(function (persona){
    return personaName === persona.persona.name
  })[0]
  let persona = filteredPersona.persona
  let hash = filteredPersona.hash
  if (persona === undefined){
    persona = {
        "name": "New Persona",
        "personaFields": [
        ]
    }
    hash = ""
    buttonText = "Create Persona"
  }
  return {
    buttonText: buttonText,
    title: `Persona - ${personaName}`,
    persona: persona,
    hash: hash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personaCreate: (persona) => {
      dispatch(personaCreate(persona))
    },
    personaUpdate: (persona) => {
      dispatch(personaUpdate(persona))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonaForm)
