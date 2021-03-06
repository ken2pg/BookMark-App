import React, { Component, useEffect, useRef } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import {
  sideBarSlice,
  fetchEditSerialFolderNumber,
  fetchAddBookFolderMark,
  fetchEditBookMarkFolder,
} from '../../slices/sideBarSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FolderItem from './folderItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 100,
    },

    menuButton: {
      marginRight: 36,
      marginLeft: '100px 500px',
    },
    hide: {
      display: 'none',
    },
    title: {
      margin: '15px 30px',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightBold,
    },
    drawer: {
      ['@media(max-width:767px)']: {
        display: 'none',
      },
    },

    drawerPaper: {
      width: 280,
      zIndex: 1000,
    },
    button: {
      fontWeight: theme.typography.fontWeightBold,
    },
    textfield: {
      width: '92%',
      margin: '0 auto',
      ['@media(max-width:767px)']: {
        width: 'none',
      },
    },
    createButton: {
      margin: '0 auto',
      fontWeight: theme.typography.fontWeightBold,
      marginTop: '18px',
      marginBottom: '10px',
      width: '80%',

      ['@media(max-width:767px)']: {
        margin: '18px auto',
        display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
      },
    },
    folderSelect: {
      display: 'none',
      ['@media(max-width:767px)']: {
        display: 'inline-block',
        marginTop: '58px',
        marginBottom: '55px',
        width: '100%',
      },
    },
    drawerSmartPhone: {
      display: 'none',
      ['@media(max-width:767px)']: {
        display: 'inline-block',
      },
    },
    closeButton: {
      display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
      margin: '10px auto',
    },
  })
);

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  //新規作成・編集時名前が空かどうかの判定
  const isNameNull = !state.sideBar.folder.folderName;
  const isEditNameNull = !state.sideBar.editFolder.folderName;

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

  const cancelEdit = () => {
    dispatch(sideBarSlice.actions.endEditFolder());
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sideBarSlice.actions.inputEditName(e.target.value));
  };

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
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isNameNull) {
              addFolder();
              dispatch(fetchAddBookFolderMark(state.sideBar.folder));
              dispatch(fetchEditSerialFolderNumber(state.sideBar.sirialFolderNumber));
            }
          }}
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

  const sideBarPC = (
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
    </Drawer>
  );

  const sideBarMobile = (
    <>
      {state.navigationBar.isOpenMenuDialog && (
        <div className={classes.folderSelect}>
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
          <Grid container>
            {state.sideBar.saveFolder.map((folder, _i) => {
              return (
                <Grid item xs={12} key={folder.folderId}>
                  <FolderItem key={folder.folderId} folder={folder} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className={classes.root}>
        {/*新規フォルダー作成画面*/}
        {CreateFolderDialog}
        {EditFolderDialog}

        {/*sidebar画面*/}
        {sideBarPC}
        {sideBarMobile}
      </div>
    </>
  );
};
export default SideBar;
