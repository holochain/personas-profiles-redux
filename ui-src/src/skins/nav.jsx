import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons//Menu'
import GroupWorkIcon from '@material-ui/icons//GroupWork';
import PersonIcon from '@material-ui/icons//Person'
import PersonasContainer from '../hApps/holo-vault/containers/personasContainer'
import PersonaContainer from '../hApps/holo-vault/containers/personaContainer'
import ProfileContainer from '../hApps/holo-vault/containers/profileContainer'
import ProfilesContainer from '../hApps/holo-vault/containers/profilesContainer'
import LoginContainer from '../hApps/holo-vault/containers/loginContainer'
const drawerWidth = 180

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    colorPrimary: 'primary',
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Navigation extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleClickListItem = (history, path) => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
    history.push(path)
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <Route render={({ history}) => (
            <div>
              <ListItem button onClick={() => { this.handleClickListItem(history, '/personas') }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Personas' />
              </ListItem>
              <ListItem button onClick={() => { this.handleClickListItem(history,'/profiles') }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Profiles' />
              </ListItem>
            </div>
          )} />
      </List>
    </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' onClick={this.handleDrawerToggle} className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap>
              Holo Brain
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer variant='temporary' anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={this.state.mobileOpen} onClose={this.handleDrawerToggle} classes={{paper: classes.drawerPaper}} ModalProps={{ keepMounted: true }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent' open classes={{paper: classes.drawerPaper}}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);
