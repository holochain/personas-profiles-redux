import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import withRoot from '../../../../withRoot'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Setup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chat
        </Typography>
        <Typography variant='body1'>
          Please click
          <Route render={({ history}) => (
            <Button onClick={() => { history.push('/profile/HoloChat') }}>Profile</Button>
          )} />
          and join the fun.
        </Typography>
      </div>
    );
  }
}

Setup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Setup));
