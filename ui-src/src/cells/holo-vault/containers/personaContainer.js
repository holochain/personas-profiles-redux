
import { connect } from 'react-redux'
import PersonaForm from '../components/persona/persona'
import {
  personaCreate
} from '../actions'

const mapStateToProps = (state, ownProps) => {
  let buttonText = 'Update Persona'
  const personaName = ownProps.match.params.name
  let persona = state.profile.personas.filter(function (persona){
    return personaName === persona.persona.name
  })[0].persona
  if (persona === undefined){
    persona = {
        "name": "New Persona",
        "personaFields": [
        ]
    }
    buttonText = "Create Persona"
  }
  return {
    buttonText: buttonText,
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
