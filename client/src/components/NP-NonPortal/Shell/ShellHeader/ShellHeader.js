import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  Button,
  Grid,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'; // STOP IT

import logo from '../logo-header.png';

const styles = theme => ({
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    portalContent: {
      flexGrow: 1,
      zIndex: 1,
      display: 'flex',
      height: '100%',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: 300,
      width: `calc(100% - ${400}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 300,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
    },
    shellLogo: {
      maxWidth: 85,
      paddingRight: '25px',
      margin: 'auto',
      marginLeft: '20px',
    },
    portalBar: {
      margin: 'auto',
      textAlign: 'center',
    },
    PortalHeaderContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signOutButtonStyles: {
      marginRight: '20px',
    },
    optionsButtonStyles: {
      margin: '0px 20px 0px 20px auto',
      padding: '0px 0px 20px 0px',
    },
  });

const ShellHeader = ({
 classes, open, togglePortalDrawer, toggleTheme, themeChoice, portal = false,
}) => (
  <AppBar
    position="absolute"
    className={classNames(classes.appBar, open && classes.appBarShift)}
  >
    <Grid container>
      <Grid xs={6}>
          <Toolbar disableGutters={!open}>
              { portal
                && (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={togglePortalDrawer}
                  className={
                        classNames(classes.menuButton, open && classes.hide)
                  }
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
              <Button>
                <a href="https://nnmta.org">
                  <img
                    variant="title"
                    className={classes.shellLogo}
                    src={logo}
                    alt="NNMTA"
                  />
                </a>
              </Button>
          </Toolbar>
      </Grid>
      <Grid
        direction="row"
        xs={6}
        alignItems="center"
        alignContent="center"
        justify="flex-end"
        container
        spacing={40}
      >
        { portal && (
          <Button component={Link} to="/" className={classes.signOutButtonStyles}>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                Sign Out
            </Typography>
          </Button>
          ) && (
              <FormControlLabel
                label={(
                  <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                    Light/Dark
                  </Typography>
                )}
                control={(
                  <Switch
                    onChange={toggleTheme}
                    checked={themeChoice === 'dark'}
                  />
                )}
              />
          )
        }
      </Grid>
    </Grid>
  </AppBar>
);

export default withStyles(styles)(ShellHeader);
