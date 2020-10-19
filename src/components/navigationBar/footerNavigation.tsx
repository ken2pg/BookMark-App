import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { navigationBarSlice } from '#/slices/navigationBarSlice';
import { BottomNavigation } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'none',
      // zIndex: theme.zIndex.drawer,
      ['@media(max-width:767px)']: {
        display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
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
