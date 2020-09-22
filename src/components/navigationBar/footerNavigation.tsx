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
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signInSlice } from '#/slices/signInPageSlice';
import { userInfoSlice } from '#/slices/userInfoSlice';
import { navigationBarSlice } from '#/slices/navigationBarSlice';
import Router from 'next/router';
import { BottomNavigation } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'none',
      // zIndex: theme.zIndex.drawer,
      ['@media(max-width:767px)']: {
        display: 'flex',
        position: 'fixed' /*←絶対位置*/,
        bottom: '0',
        borderTop: '1px solid',
        borderColor: '#e0e0e0',
        zIndex: '1000',
      },
    },
  })
);

const FooterNavigation = () => {
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

  const [value, setValue] = React.useState(0);
  return (
    <>
      <BottomNavigation
        value={state.navigationBar.footerButtonNumber}
        onChange={(event, newValue) => {
          dispatch(navigationBarSlice.actions.changefooterButtonNumber(newValue));
          // console.log(newValue);
          if (newValue === 0) {
            dispatch(navigationBarSlice.actions.OpenMenuDrower());
          } else {
            dispatch(navigationBarSlice.actions.CloseMenuDrower());
          }
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Folder" icon={<FolderIcon />} />
        <BottomNavigationAction label="BookMark" icon={<BookmarkIcon />} />
      </BottomNavigation>
    </>
  );
};
export default FooterNavigation;
