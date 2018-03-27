import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../withRoot';
import {Field, reduxForm} from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import FingerPrint from 'material-ui-icons/Fingerprint'
import { MenuItem } from 'material-ui/Menu'
import ProfileField from './profileField'
const styles = theme => ({
  root: {
    textAlign: 'left',
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  icon: {
    flex: 1
  },
  persona: {
    flex: 0
  },
  button: {
    marginTop: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit,
  }
});

const renderProfileField = ({
  input,
  suggestions,
  label,
  name,
  id,
  onChange,
  required,
  meta: {
    touched,
    error
  },
  ...custom
}) => (<ProfileField name={name} id={id} label={label} onChange={onChange} error={touched && error} {...input} {...custom} suggestions={suggestions} />)

// const validate = values => {
//   const errors = {}
//   const requiredFields = ['userName', 'firstName', 'lastName', 'email']
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = true
//     }
//   })
//   return errors
// }

class Profile extends React.Component {
  handleRegister = values => {
    this.props.register(values)
  }
  state = {
    personaFieldValue: ''
  };

  handleChange = (event, { newValue }) => {
    consol.log(newValue)
    let personaFieldValue  = newValue.split(' - ')[0]
    this.setState({
      personaFieldValue: personaFieldValue
    })
  }
  render() {
    const {classes, handleSubmit, profileHash, profileSpec, personas} = this.props
    let suggestions = []
    personas.forEach(function(persona){
      persona.persona.forEach(function(field){
        let key = Object.keys(field)[0]
        suggestions.push({ 'persona': persona.name, 'field': key, 'label': field[key]})
      })
    })

    return (<div className={classes.root}>
      <Typography variant="display1">
        My Personal Data
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your personal information is kept by you in 1 location, this "My Personal Data" app. Other applications
        ask to borrow your info for a set amount of time and you can revoke that access when ever you like.
        Also you don't have to keep filling out the same info for every app and giving away your info. "My Personal Data"
        helps you reuse info you've already saved.
      </Typography>
      <form onSubmit={handleSubmit}>
        {
          profileSpec.profile.map((field, index) => (<div key={index}>
            <Field name={field.appLabel} onChange={this.handleChange} component={renderProfileField} label={field.display} suggestions={suggestions} usage={field.usage} className={classes.persona}/>
          </div>))
        }
        <Button name="register" variant="raised" className={classes.button} color="secondary" onClick={handleSubmit(this.handleRegister)}>
          <FingerPrint/>
          Create Profile
        </Button>
      </form>
    </div>);
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

// const ProfileForm = reduxForm({form: 'Profile', validate})(Profile)
const ProfileForm = reduxForm({form: 'Profile'})(Profile)
export default withRoot(withStyles(styles)(ProfileForm));
