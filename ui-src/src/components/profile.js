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

let suggestions = []
let profileMapping = {}
const renderProfileField = ({
  suggestions,
  label,
  specField,
  required,
  onSelect,
  meta: {
    touched,
    error
  },
  ...custom
}) => (<ProfileField specField={specField} label={label} error={touched && error}
    onSelect={onSelect} {...custom} suggestions={suggestions} />)

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
  handleCreateProfile = () => {
    this.props.createProfileMapping(profileMapping)
  }

  state = {
    personaFieldValue: '',
    suggestions: []
  };


  handleSelect = (mappingField) => {
    if(mappingField !== undefined){
      let fieldName  = mappingField.split(' - ')[0]
      let holoVaultField = mappingField.split(' - ')[1]
      profileMapping.profile[fieldName]= holoVaultField
      console.log(mappingField)
      this.setState({
        personaFieldValue: mappingField
      })
    }
    console.log(profileMapping)
  }

  componentDidMount(){
    this.props.personas.forEach(function(persona){
      persona.persona.forEach(function(field){
        let key = Object.keys(field)[0]
        suggestions.push({ 'persona': persona.name, 'field': key, 'label': field[key]})
      })
    })
    profileMapping = {
      'id': this.props.profileSpec.id,
      'sourceDna': this.props.profileSpec.sourceDna,
      'expiry': this.props.profileSpec.expiry,
      'profile': {}
    }
  }

  render() {
    const {classes, handleSubmit, profileHash, profileSpec} = this.props
    return (<div className={classes.root}>
      <Typography variant='display1'>
        HoloVault
      </Typography>
      <Typography variant='body1' gutterBottom>
        Your personal information is kept by you in 1 location, this 'HoloVault' app. Other applications
        ask to borrow your info for a set amount of time and you can revoke that access when ever you like.
        Also you don't have to keep filling out the same info for every app and giving away your info. 'HoloVault'
        helps you reuse info you've already saved.
      </Typography>
      <form onSubmit={handleSubmit}>
        {
          profileSpec.profile.map((field, index) => (<div key={index}>
            <Field name={field.appLabel} specField={field.appLabel} onSelect={this.handleSelect} component={renderProfileField} label={field.display} suggestions={suggestions} usage={field.usage} personaField={profileSpec.id + ' (' + field.appLabel + ')'} className={classes.persona}/>
          </div>))
        }
        <Button name='createProfile' variant='raised' className={classes.button} color='secondary' onClick={handleSubmit(this.handleCreateProfile)}>
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
