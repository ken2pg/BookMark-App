import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
import TextField from '@material-ui/core/TextField';

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
    textfield: {
      width: '92%',
      margin: '0 auto',
    },
    createButton: {
      margin: '0 auto',

      // display: 'inline-block',
      // margin: '0 12%',
      marginTop: '18px',
      marginBottom: '10px',
      width: '75%',
      // padding: '-20%',
    },
  })
);

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  //編集開始・修了、フォルダーの追加処理
  const startEdit = () => {
    dispatch(sideBarSlice.actions.startEditFolder());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sideBarSlice.actions.inputName(e.target.value));
  };
  const cancelEdit = () => {
    dispatch(sideBarSlice.actions.endEditFolder());
  };
  const addFolder = () => {
    dispatch(sideBarSlice.actions.addFolder());
    dispatch(sideBarSlice.actions.endEditFolder());
  };

  const EnterKeyPress = () => {
    dispatch(sideBarSlice.actions.addFolder());
    dispatch(sideBarSlice.actions.endEditFolder());
  };

  //Validation
  const isNameNull = !state.sideBar.folder.folderName;

  // 編集画面
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
          <DialogContentText>Plese input new folder's name!</DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleInputChange}
          className={classes.textfield}
          id="folderName"
          label="Folder Name"
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     e.target.addEventListener('blur', pause);
          //   }
          // }}
        />
        <DialogActions>
          <Button autoFocus onClick={cancelEdit} color="primary">
            <Box className={classes.button}>Cancel</Box>
          </Button>
          <Button onClick={addFolder} disabled={isNameNull} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

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
        <Button
          className={classes.createButton}
          variant="outlined"
          color="primary"
          onClick={startEdit}
        >
          Create New Folder
        </Button>
        <List>
          {state.sideBar.saveFolder.map((folder, _i) => {
            return (
              <ListItem button key={_i} onClick={() => {}}>
                <FolderItem key={_i} folder={folder} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      {/*新規フォルダー作成画面*/}
      {EditMenu}
    </div>
  );
};
export default SideBar;
