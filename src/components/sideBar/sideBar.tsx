import React, { Component, useEffect, useRef } from 'react';

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
import AddIcon from '@material-ui/icons/Add';

import {
  sideBarSlice,
  fetchEditSerialFolderNumber,
  fetchSerialFolderNumber,
  fetchInitialFolderState,
  fetchAddBookFolderMark,
  fetchEditBookMarkFolder,
} from '../../slices/sideBarSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FolderItem from './folderItem';
import FolderIcon from '@material-ui/icons/Folder';

import { folder } from '#/types/folder';
import { signInSlice } from '#/slices/signInPageSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '30%',
      // margin: '25px 0',
      // display: 'flex',
      zIndex: 100,
    },
    title: {
      // textAlign: 'center',
      margin: '15px 30px',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightBold,
    },
    drawer: {},

    drawerPaper: {
      width: 280,
      // zIndex: theme.zIndex.speedDial,
      zIndex: 1000,
    },
    button: {
      fontWeight: theme.typography.fontWeightBold,
    },
    textfield: {
      width: '92%',
      margin: '0 auto',
    },
    createButton: {
      margin: '0 auto',
      fontWeight: theme.typography.fontWeightBold,
      // display: 'inline-block',
      // margin: '0 12%',
      marginTop: '18px',
      marginBottom: '10px',
      width: '80%',
      // padding: '-20%',
    },
  })
);

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  // const focusCreateNewFolderName = useRef(null);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  //編集開始・修了、フォルダーの追加処理
  const CreateNewFolder = () => {
    dispatch(sideBarSlice.actions.startCreateFolder());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sideBarSlice.actions.inputName(e.target.value));
  };
  const cancelNewCreate = () => {
    dispatch(sideBarSlice.actions.cancelCreateFolder());
  };
  const addFolder = () => {
    dispatch(sideBarSlice.actions.addFolder());
    dispatch(sideBarSlice.actions.endCreateFolder());
  };

  const EnterKeyPress = () => {
    dispatch(sideBarSlice.actions.addFolder());
    dispatch(sideBarSlice.actions.endCreateFolder());
  };

  const cancelEdit = () => {
    dispatch(sideBarSlice.actions.endEditFolder());
    // dispatch(sideBarSlice.actions.endEditFolder());
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sideBarSlice.actions.inputEditName(e.target.value));
  };

  // const focusNewFolderName = () => {
  //   focusCreateNewFolderName.current.focus();
  // };
  //Validation
  const isNameNull = !state.sideBar.folder.folderName;

  const isEditNameNull = !state.sideBar.editFolder.folderName;

  // 新規作成画面
  const CreateFolderDialog = (
    <div className={classes.root}>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={state.sideBar.isCreate}
        onClose={cancelNewCreate}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title"> フォルダー新規作成</DialogTitle>
        <DialogContent>
          <DialogContentText>作成するフォルダーの名前を入れてください！</DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleInputChange}
          className={classes.textfield}
          id="folderName"
          label="フォルダー名"
          // inputRef={focusCreateNewFolderName}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isNameNull) {
              addFolder();
              dispatch(fetchAddBookFolderMark(state.sideBar.folder));
              dispatch(fetchEditSerialFolderNumber(state.sideBar.sirialFolderNumber));
            }
          }}
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     e.target.addEventListener('blur', pause);
          //   }
          // }}
        />
        <DialogActions>
          <Button autoFocus onClick={cancelNewCreate} color="primary">
            <Box className={classes.button}>取り消し</Box>
          </Button>
          <Button
            onClick={() => {
              addFolder();
              dispatch(fetchAddBookFolderMark(state.sideBar.folder));
              dispatch(fetchEditSerialFolderNumber(state.sideBar.sirialFolderNumber));
            }}
            disabled={isNameNull}
            color="primary"
            className={classes.button}
          >
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  // フォルダー編集画面
  const EditFolderDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        //1つでもisEditがtrueなものがあったらフォルダー編集画面を開く
        open={state.sideBar.saveFolder.some((t) => t.isEdit === true)}
        onClose={cancelEdit}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">フォルダー名の編集</DialogTitle>
        <DialogContent>
          <DialogContentText>編集するフォルダーの名前を入れてください！</DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleEditInputChange}
          className={classes.textfield}
          id="folderName"
          label="フォルダー名"
          value={state.sideBar.editFolder.folderName}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isEditNameNull) {
              dispatch(sideBarSlice.actions.changeFolderName(state.sideBar.editFolder.folderName));
              dispatch(sideBarSlice.actions.endEditFolder());
              dispatch(fetchEditBookMarkFolder(state.sideBar.editFolder));
            }
          }}
        />
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              dispatch(sideBarSlice.actions.endEditFolder());
            }}
            color="primary"
          >
            <Box className={classes.button}>取り消し</Box>
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(sideBarSlice.actions.changeFolderName(state.sideBar.editFolder.folderName));
              dispatch(sideBarSlice.actions.endEditFolder());
              dispatch(fetchEditBookMarkFolder(state.sideBar.editFolder));
            }}
            disabled={isEditNameNull}
            color="primary"
          >
            決定
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
          フォルダーリスト
        </Typography>
        <Divider />
        <Button
          className={classes.createButton}
          variant="outlined"
          color="primary"
          onClick={() => {
            CreateNewFolder();
          }}
        >
          <AddIcon></AddIcon>
          <span style={{ fontWeight: 'bold' }}>フォルダー新規作成</span>
        </Button>
        <List>
          {state.sideBar.saveFolder.map((folder, _i) => {
            return (
              <ListItem
                button
                key={_i}
                onClick={() => {
                  dispatch(sideBarSlice.actions.selectFolder(folder.folderId));
                }}
              >
                <FolderItem key={_i} folder={folder} />
              </ListItem>
            );
          })}
        </List>
        {/* asynctest */}
        {/* <Button
          onClick={async () => {
            const result = await dispatch(fetchTest());
            console.log(result);
          }}
        >
          test
        </Button> */}
      </Drawer>
      {/*新規フォルダー作成画面*/}
      {CreateFolderDialog}
      {EditFolderDialog}
    </div>
  );
};
export default SideBar;
