import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signInSlice } from '#/slices/signInPageSlice';
import { userInfoSlice } from '#/slices/userInfoSlice';
import { navigationBarSlice } from '#/slices/navigationBarSlice';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // zIndex: theme.zIndex.drawer,
    },
    toolBar: {
      display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
      justifyContent: 'space-between',
      ['@media(max-width:767px)']: {
        // justifyContent: 'center',
      },
    },
    title: {
      marginLeft: '9px',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightMedium,
      ['@media(max-width:767px)']: {
        // alignItems: 'center',
        // marginLeft: 'none',
        marginRight: '-10%',
        margin: '0 auto',
      },
    },
    icons: {
      display: 'inline-block',
      margin: '10px auto',
    },
    menu: {
      marginTop: '50px',
    },
    profile: {
      width: '250px',
      textAlign: 'center',
      marginBottom: '10px',
    },
    menuButton: {
      // textAlign: 'center',
      margin: '0px auto',
    },
    button: {
      marginLeft: '20px',
      ['@media(max-width:767px)']: {
        display: 'none',
      },
    },
    btn: {
      fontWeight: 'bold',
    },
    hide: {
      display: 'none',
    },
    menuIcon: {
      display: 'none',
      ['@media(max-width:767px)']: {
        display: 'inline-block',
        marginLeft: 'auto',
      },
    },
    drawer: {},
    drawerPaper: {
      width: '50%',
      // zIndex: theme.zIndex.speedDial,
      zIndex: 1000,
    },
  })
);

const NavigationBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const [isOpenProfile, setIsOpenProfile] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpenSideBar, setIsMenuSideBar] = useState(false);

  const confirmDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">確認</DialogTitle>
        <DialogContent>
          <DialogContentText>サインアウトしてもよろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className={classes.btn}
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            取り消し
          </Button>
          <Button
            color="primary"
            className={classes.btn}
            onClick={() => {
              dispatch(signInSlice.actions.signOut());
              dispatch(userInfoSlice.actions.setInitialState());
              setIsOpenDialog(false);
              Router.push({ pathname: './signIn' });
            }}
          >
            サインアウト
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const smartphoneDrawer = (
    <>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={classes.menu}
      >
        <div className={classes.profile}>
          <div className={classes.icons}>
            <Avatar style={{ width: '70px', height: '70px' }}>
              <PersonIcon style={{ width: '60px', height: '60px' }} />
            </Avatar>
          </div>
          <Typography>{state.userInfo.userName}</Typography>
          <Typography color="textSecondary">{state.userInfo.Email}</Typography>
        </div>
        <Divider />
        {state.signIn.isLogin && (
          <MenuItem
            onClick={() => {
              setIsOpenDialog(true);
              handleClose();
            }}
          >
            <Box className={classes.menuButton}>サインアウト</Box>
          </MenuItem>
        )}
      </Menu>
    </>
  );
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          {/* <IconButton color="inherit" style={{}}>
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title}>BookMark-App</Typography>
          <IconButton
            className={classes.menuIcon}
            color="inherit"
            aria-label="Menu"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              if (state.signIn.isLogin) {
                setAnchorEl(event.currentTarget);
              } else {
                dispatch(signInSlice.actions.signOut());
                dispatch(userInfoSlice.actions.setInitialState());
                Router.push({ pathname: './signIn' });
              }
            }}
          >
            <Avatar style={{ width: '30px', height: '30px' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          {smartphoneDrawer}
          <div>
            {state.signIn.isLogin && (
              <Button
                className={classes.button}
                color="inherit"
                onClick={() => {
                  setIsOpenDialog(true);
                }}
              >
                サインアウト
              </Button>
            )}
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={handleDrawerOpen}
              edge="end"
              // className={clsx(classes.menuButton, {
              //   [classes.hide]: open,
              // })}
              onClick={() => {
                if (state.navigationBar.isOpenMenuDialog) {
                  dispatch(navigationBarSlice.actions.CloseMenuDrower());
                } else {
                  dispatch(navigationBarSlice.actions.OpenMenuDrower());
                }
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <Button
              className={classes.button}
              // edge="end"
              // aria-label="account of current user"
              // aria-controls="menu-appbar"
              // aria-haspopup="true"
              // onClick={handleMenu}
              color="inherit"
              variant="outlined"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                if (state.signIn.isLogin) {
                  setAnchorEl(event.currentTarget);
                } else {
                  dispatch(signInSlice.actions.signOut());
                  dispatch(userInfoSlice.actions.setInitialState());
                  Router.push({ pathname: './signIn' });
                }
              }}
            >
              {state.signIn.isLogin && (
                <span style={{ marginRight: '10px' }}>{state.userInfo.userName}</span>
              )}
              {!state.signIn.isLogin && (
                <span style={{ marginRight: '10px' }}>サインインをする</span>
              )}
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              className={classes.menu}
            >
              <div className={classes.profile}>
                <div className={classes.icons}>
                  <Avatar style={{ width: '70px', height: '70px' }}>
                    <PersonIcon style={{ width: '60px', height: '60px' }} />
                  </Avatar>
                </div>
                <Typography>{state.userInfo.userName}</Typography>
                <Typography color="textSecondary">{state.userInfo.Email}</Typography>
              </div>
              <Divider />
              {state.signIn.isLogin && (
                <MenuItem
                  onClick={() => {
                    setIsOpenDialog(true);
                    handleClose();
                  }}
                >
                  <Box className={classes.menuButton}>サインアウト</Box>
                </MenuItem>
              )}
              {/* {!state.signIn.isLogin && (
                <MenuItem
                  onClick={() => {
                    Router.push({ pathname: './signIn' });
                  }}
                >
                  <Box className={classes.menuButton}>サインイン</Box>
                </MenuItem>
              )} */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {confirmDialog}
    </div>
  );
};
export default NavigationBar;
