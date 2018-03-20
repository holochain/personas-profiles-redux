import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../withRoot';
import {Field, reduxForm} from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import Save from 'material-ui-icons/Save'
import Dvr from 'material-ui-icons/Dvr'
import FingerPrint from 'material-ui-icons/Fingerprint'

const styles = theme => ({
  root: {
    textAlign: 'left',
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

const renderTextField = ({
  input,
  label,
  name,
  required,
  meta: {
    touched,
    error
  },
  ...custom
}) => (<TextField name={name} label={label} error={touched && error} {...input} {...custom}/>)

function UsageIcon(props) {
  switch (props.type) {
    case 'display':
      return (
        <Tooltip title={props.reason}><Dvr/></Tooltip>
      )
    case 'store':
      return (
        <Tooltip title={props.reason}><Save/></Tooltip>
      )
      default : return <div>{props.type}</div>
    }
  }

  const validate = values => {
    const errors = {}
    const requiredFields = ['userName', 'firstName', 'lastName', 'email']
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = true
      }
    })
    return errors
  }

  class Profile extends React.Component {
    handleRegister = values => {
      this.props.register(values)
    }

    render() {
      const {classes, handleSubmit, profileHash, profileSpec} = this.props;
      return (<div className={classes.root}>
        <form onSubmit={handleSubmit}>
          {
            profileSpec.profile.map((field, index) => (<div key={index}>
              <Field name={field.appLabel} component={renderTextField} label={field.display} />
              {
                field.usage.map((usage, useIndex) => (
                <UsageIcon key={useIndex} type={usage.type} reason={usage.reason}/>
              ))
            }
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

  const ProfileForm = reduxForm({form: 'Profile', validate})(Profile)
  export default withRoot(withStyles(styles)(ProfileForm));
