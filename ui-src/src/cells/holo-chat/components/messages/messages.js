import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import withRoot from '../../../../withRoot'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import List from 'material-ui/List'
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// import listCells from './listCells.md'
import Markdown from 'react-markdown'
const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
});

class Messages extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Holo Chat
        </Typography>
        <Typography variant='body1'>
          Please set up a profile and join the fun.
        </Typography>
      <Route render={({ history}) => (
        <Button onClick={() => { history.push('/profile/HoloChat') }}>Profile</Button>
        )} />
      </div>
    );
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Messages));
