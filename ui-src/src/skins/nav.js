import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
// import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import GroupWorkIcon from 'material-ui-icons/GroupWork';
import PersonIcon from 'material-ui-icons/Person'
import PersonasContainer from '../cells/holo-vault/containers/personasContainer'
import PersonaContainer from '../cells/holo-vault/containers/personaContainer'
import ProfileContainer from '../cells/holo-vault/containers/profileContainer'
import ProfilesContainer from '../cells/holo-vault/containers/profilesContainer'
import CellsContainer from '../cells/cells/containers/cellsContainer'
import SetupContainer from '../cells/holo-chat/containers/setupContainer'
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

  handleClickListItem = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <Route render={({ history}) => (
            <div>
              <ListItem name="cells" button onClick={() => { history.push('/cells') }}>
                <ListItemIcon>
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText primary='Cells' />
              </ListItem>
              <ListItem id="personas" button onClick={() => { history.push('/personas') }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Personas' />
              </ListItem>
              <ListItem name="profiles" button onClick={() => { history.push('/profiles') }}>
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
              Holochain
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
          <Route path='/personas' component={PersonasContainer} />
          <Route path='/persona/:name' component={PersonaContainer} />
          <Route path='/profiles' component={ProfilesContainer} />
          <Route path='/profile/:name' component={ProfileContainer} />
          <Route path='/cells' component={CellsContainer} />
          <Route path='/cell/:name' component={SetupContainer} />
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
