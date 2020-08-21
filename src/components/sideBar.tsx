import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { sideBarSlice } from '../slices/sideBarSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import FolderItem from './folderItem';

import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '30%',
      // margin: '25px 0',
      // display: 'flex',
    },
    title: {
      // textAlign: 'center',
      margin: '15px 30px',
      fontSize: '20px',
    },
    drawer: {},

    drawerPaper: {
      width: 240,
      zIndex: -100,
    },
  })
);

const SideBar = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  //   console.log(state.sideBar.folder);
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Typography color={'textSecondary'} className={classes.title}>
          Folder List
        </Typography>
        <Divider />
        <List>
          <ListItem button key={'sample1'}>
            <ListItemIcon>
              <FolderIcon></FolderIcon>
            </ListItemIcon>
            <FolderItem />
          </ListItem>
          <ListItem button key={'sample1'}>
            <ListItemIcon>
              <FolderIcon></FolderIcon>
            </ListItemIcon>
            <FolderItem />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
export default SideBar;
