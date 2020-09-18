import React from 'react';

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

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signInSlice } from '#/slices/signInPageSlice';
import { userInfoSlice } from '#/slices/userInfoSlice';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // zIndex: theme.zIndex.drawer,
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      marginLeft: '9px',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightMedium,
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
    },
    btn: {
      fontWeight: 'bold',
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
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title}>BookMark-App</Typography>
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
