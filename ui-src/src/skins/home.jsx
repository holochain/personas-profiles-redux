import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import PersonasContainer from '../hApps/holo-vault/containers/personasContainer'
import PersonaContainer from '../hApps/holo-vault/containers/personaContainer'
import ProfileContainer from '../hApps/holo-vault/containers/profileContainer'
import ProfilesContainer from '../hApps/holo-vault/containers/profilesContainer'
import LoginContainer from '../hApps/holo-vault/containers/loginContainer'

const styles = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%'
  }
});

class MiniDrawer extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Route exact path='/login' title='Holo' render={props =>
            <div>
              <LoginContainer {...props} />
            </div>
          } />
          <Route path='/personas' title='Personas' component={PersonasContainer} />
          <Route path='/persona/:name' component={PersonaContainer} />
          <Route path='/profiles' component={ProfilesContainer} />
          <Route exact path='/profile/:hash' render={ props =>
            <ProfileContainer {...props} />
          } />
          <Route exact path='/profile/:hash/:returnUrl' render={ props =>
            <ProfileContainer {...props} />
          } />
          <Route exact path='/' render={ props =>
            <div>
              <PersonasContainer {...props} />
              <ProfilesContainer {...props} />
            </div>
          } />
          <MediaQuery minDeviceWidth={1025}>

          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={767}>
          </MediaQuery>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
