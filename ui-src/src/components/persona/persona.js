import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import { Field, FieldArray, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField'
import FingerPrint from 'material-ui-icons/Fingerprint'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

const renderTextField = ({ input, label, required, meta: { touched, error },  ...custom }) => (
  <TextField label={label} required={required} error={touched && error} {...input} {...custom} />
)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'userName',
    'firstName',
    'lastName',
    'email'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
    }
  })
  return errors
}

function PersonaFields (props) {
  if(props.persona.personaFields !== undefined){
    return (
      props.persona.personaFields.map((field, index) => (
        <div key={index}>
          <Field name={'fieldName' + index} component={renderTextField} label="Field Name" required={true} />
          <Field name={'fieldValue' + index} component={renderTextField} label="Field Value" required={true} />
        </div>
      ))
    )
  } else {
    return (
      <div>
        <Typography variant='subheading'>
        </Typography>
      </div>
    )
  }
}

class Persona extends React.Component {
  state = {
    persona: {}
  }

  handlePersona = values => {
      this.props.savePersona(values)
  }

  handleAddPersonaField = () =>   {
    let personaFields = this.state.persona.personaFields.slice()
    personaFields.push({"firstName": "Phil"})
    this.setState(prevState => ({
        persona: {
            ...prevState.persona,
            personaFields: [...prevState.persona.personaFields, personaFields]
        }
    }))
  }

  componentDidMount(){
    this.setState({
      persona: this.props.persona
    });
  }
  render() {
    const { classes, handleSubmit, persona } = this.props;
    return (
      <div className={classes.root}>

        <form onSubmit={handleSubmit}>
          <div>
            <Field name="personaName" component={renderTextField} label="Persona Name" value={persona.name} required={true} />
          </div>
          <PersonaFields persona={this.state.persona}/>
          <Button name='addField' variant='raised' className={classes.button} color='primary' onClick={this.handleAddPersonaField}>
            <FingerPrint/>
            Add Field
          </Button>
          <Button name='createProfile' variant='raised' className={classes.button} color='secondary' onClick={handleSubmit(this.handlePersona)}>
            <FingerPrint/>
            Create Persona
          </Button>
        </form>
      </div>
    );
  }
}

Persona.propTypes = {
  classes: PropTypes.object.isRequired
};

const PersonaForm = reduxForm({form: 'Profile', validate})(Persona)
export default withRoot(withStyles(styles)(PersonaForm));
