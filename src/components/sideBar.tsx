import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

import { folder } from '#/types/folder';

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
    button: {},
  })
);

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const startEdit = () => {
    dispatch(sideBarSlice.actions.startEditFolder());
  };

  const cancelEdit = () => {
    dispatch(sideBarSlice.actions.endEditFolder());
  };
  const addFolder = (folder: folder) => {
    dispatch(sideBarSlice.actions.addFolder(folder));
  };

  const EditMenu = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={state.sideBar.folder.isEdit}
        onClose={cancelEdit}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title"> Create New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>test</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
  console.log(state.sideBar.saveFolder);
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
        <Button className={classes.button} variant="outlined" color="primary" onClick={startEdit}>
          Create New Folder
        </Button>
        <List>
          {state.sideBar.saveFolder.map((folder, _i) => {
            <ListItem button key={'sample1'}>
              <ListItemIcon>
                <FolderIcon></FolderIcon>
              </ListItemIcon>
              <FolderItem folder={state.sideBar.folder} />
            </ListItem>;
          })}
        </List>
      </Drawer>
      {/*新規フォルダー作成画面*/}
      {EditMenu}
    </div>
  );
};
export default SideBar;
