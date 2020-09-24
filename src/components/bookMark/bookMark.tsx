import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import BookmarkItem from './bookMarkItem';
import {
  bookMarkSlice,
  fetchInitialState,
  fetchAddBookMark,
  fetchSerialNumber,
  fetchEditSerialNumber,
  fetchEditBookMark,
} from '#/slices/bookMarkSlice';
import { bookMark } from '#/types/bookMark';
import { initialState } from '#/slices/sideBarSlice';
import { signInSlice } from '#/slices/signInPageSlice';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '80.5%',
      width: `calc(100% - 298px)`,
      //   margin: '0 auto',
      marginTop: '74px',
      marginLeft: '290px',
      // border: '1px solid red',
      ['@media(max-width:767px)']: {
        width: `100%`,
        margin: '58px auto',
        padding: '10px',
      },
    },
    headerSearch: {
      marginLeft: '10px',
      width: '500px',
      display: 'flex',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    header: {
      marginBottom: '10px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      // width: 400,
    },
    textfield: {
      width: '92%',
      margin: '0 auto',
      marginBottom: '30px',
      ['@media(max-width:767px)']: {
        marginBottom: '15px',
      },
    },
    button: {
      fontWeight: 'bold',
    },
    iconButton: {
      padding: 10,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24px',
    },
    CreatNewFolderButton: {
      ['@media(max-width:1024px)']: {
        // width: '10px',
        height: '45px',
      },
    },
    buttonName: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '34px',
      ['@media(max-width:1024px)']: {
        display: 'none',
      },
    },
    selectFolderName: {
      fontSize: '24px',
      marginBottom: '15px',
      ['@media(max-width:767px)']: {
        fontSize: '18px',
      },
    },
  })
);

const BookMark = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const createNewBookMark = () => {
    dispatch(bookMarkSlice.actions.startCreateBookMark());
  };

  const cancelNewCreate = () => {
    dispatch(bookMarkSlice.actions.cancelCreateBookMark());
  };

  const addNewBookMark = () => {
    dispatch(bookMarkSlice.actions.addBookMark());
    dispatch(bookMarkSlice.actions.endCreateBookMark());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(bookMarkSlice.actions.inputName(e.target.value));
  };

  const handleInputURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(bookMarkSlice.actions.inputURL(e.target.value));
  };
  //Validation
  const isNameNull = !state.bookMark.newBookMark.siteName;
  const isEditNameNull = !state.bookMark.editSaveFolder.siteName;

  //focus
  const focusURL = useRef(null);
  const focusMemo = useRef(null);
  const focusEditURL = useRef(null);
  const focusEditMemo = useRef(null);

  //新規作成画面
  const CreateBookmarkDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={state.bookMark.isCreate}
        onClose={cancelNewCreate}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">ブックマークの新規作成</DialogTitle>
        <DialogContent>
          <DialogContentText>
            作成するブックマークのサイト名、URL、メモ内容を入力してください。
          </DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleInputChange}
          className={classes.textfield}
          id="Site Name"
          label="サイト名"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              focusURL.current.focus();
            }
          }}
        />
        <TextField
          onChange={handleInputURLChange}
          className={classes.textfield}
          id="Site URL"
          label="サイトのURL"
          inputRef={focusURL}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              focusMemo.current.focus();
            }
          }}
        />
        <MediaQuery query="(max-width: 767px)">
          <TextField
            multiline
            rows={8}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(bookMarkSlice.actions.inputMemo(e.target.value));
            }}
            className={classes.textfield}
            id="Site Memo"
            label="メモ"
            inputRef={focusMemo}
          />
        </MediaQuery>
        <MediaQuery query="(min-width: 767px)">
          <TextField
            multiline
            rows={12}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(bookMarkSlice.actions.inputMemo(e.target.value));
            }}
            className={classes.textfield}
            id="Site Memo"
            label="メモ"
            inputRef={focusMemo}
          />
        </MediaQuery>

        <DialogActions>
          <Button autoFocus onClick={cancelNewCreate} color="primary" className={classes.button}>
            <Box className={classes.button}>取り消し</Box>
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              addNewBookMark();
              dispatch(bookMarkSlice.actions.searchOutput());
              dispatch(fetchAddBookMark(state.bookMark.newBookMark));
              dispatch(fetchEditSerialNumber(state.bookMark.serialNumbers));
            }}
            disabled={isNameNull}
            color="primary"
          >
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  //編集画面
  const EditBookmarkDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={state.bookMark.bookMarks.some((t) => t.isEdit === true)}
        onClose={() => {
          dispatch(bookMarkSlice.actions.endEditBookMark());
        }}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">ブックマークの編集</DialogTitle>
        <DialogContent>
          <DialogContentText>変更したい内容を入力してください</DialogContentText>
        </DialogContent>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditName(e.target.value));
          }}
          className={classes.textfield}
          id="Site Name"
          label="サイト名"
          value={state.bookMark.editSaveFolder.siteName}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              focusEditURL.current.focus();
            }
          }}
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditURL(e.target.value));
          }}
          className={classes.textfield}
          id="Site URL"
          label="サイトのURL"
          value={state.bookMark.editSaveFolder.siteURL}
          inputRef={focusEditURL}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              focusEditMemo.current.focus();
            }
          }}
        />
        <MediaQuery query="(min-width: 767px)">
          <TextField
            multiline
            rows={12}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(bookMarkSlice.actions.inputEditMemo(e.target.value));
            }}
            className={classes.textfield}
            id="Site Memo"
            label="メモ"
            value={state.bookMark.editSaveFolder.memo}
            inputRef={focusEditMemo}
          />
        </MediaQuery>

        <MediaQuery query="(max-width: 767px)">
          <TextField
            multiline
            rows={8}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(bookMarkSlice.actions.inputEditMemo(e.target.value));
            }}
            className={classes.textfield}
            id="Site Memo"
            label="メモ"
            value={state.bookMark.editSaveFolder.memo}
            inputRef={focusEditMemo}
          />
        </MediaQuery>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              dispatch(bookMarkSlice.actions.endEditBookMark());
            }}
            color="primary"
          >
            <Box className={classes.button}>取り消し</Box>
          </Button>
          <Button
            onClick={() => {
              dispatch(bookMarkSlice.actions.changeBookMark());
              dispatch(bookMarkSlice.actions.endEditBookMark());
              dispatch(bookMarkSlice.actions.searchOutput());
              dispatch(fetchEditBookMark(state.bookMark.editSaveFolder));
              // console.log(state.bookMark.editSaveFolder);
            }}
            disabled={isEditNameNull}
            color="primary"
            className={classes.button}
          >
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  //memo画面
  const memoDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={state.bookMark.bookMarks.some((t) => t.isMemoOpen === true)}
        onClose={() => {
          dispatch(bookMarkSlice.actions.closeMemoDialog());
        }}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">メモ</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>{bookMarkItem.siteName}</DialogContentText>
          <DialogContentText>{bookMarkItem.memo}</DialogContentText> */}
          {/* <DialogContentText>{state.bookMark.memoDialog.siteName}</DialogContentText> */}
          <DialogContentText>{state.bookMark.memoDialog.memo}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              dispatch(bookMarkSlice.actions.closeMemoDialog());
            }}
            color="primary"
          >
            <Box className={classes.button}>Close</Box>
          </Button>
          {/* <Button
            // onClick={() => {
            //   dispatch(bookMarkSlice.actions.changeBookMark());
            //   dispatch(bookMarkSlice.actions.endEditBookMark());
            // }}
            disabled={isEditNameNull}
            color="primary"
          >
            OK
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );

  const selectFolder = state.sideBar.saveFolder
    .filter((list) => {
      return list.folderId === state.sideBar.selectId;
    })
    .shift();

  return (
    <div className={classes.root}>
      {/* header */}
      <div className={classes.header}>
        <Button
          className={classes.CreatNewFolderButton}
          disabled={!state.sideBar.selectId}
          variant="outlined"
          color="primary"
          component="span"
          onClick={() => {
            createNewBookMark();
            dispatch(bookMarkSlice.actions.selectId(state.sideBar.selectId));
          }}
        >
          <AddIcon />
          <Typography className={classes.buttonName}>新規作成</Typography>
        </Button>
        <Paper className={classes.headerSearch} elevation={0} variant="outlined">
          <InputBase
            value={state.bookMark.inputText}
            className={classes.input}
            placeholder="検索"
            inputProps={{ 'aria-label': 'search book mark' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(bookMarkSlice.actions.inputSearchText(e.target.value));
              dispatch(bookMarkSlice.actions.searchOutput());
            }}
            // value={state.bookMark.searchText}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={() => {
              dispatch(bookMarkSlice.actions.allSearchTextDelete());
            }}
          >
            {/* type="submit"  */}
            <HighlightOffIcon />
          </IconButton>
        </Paper>
      </div>
      <div>
        {state.sideBar.selectId !== 0 && (
          <Typography className={classes.selectFolderName}>
            FolderName：{selectFolder.folderName}
          </Typography>
        )}
      </div>
      <Grid container spacing={1}>
        <MediaQuery query="(min-width: 1023px)">
          {/* {(!state.bookMark.searchText || state.bookMark.searchText === ' ') && */}
          {!state.bookMark.searchText &&
            state.bookMark.bookMarks.map((bookMark) => {
              //isSelectがtrueのfolder内容のみ表示
              if (bookMark.folderId === state.sideBar.selectId) {
                return (
                  <Grid item xs={3} key={bookMark.bookMarkId}>
                    <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
                  </Grid>
                );
              }
            })}
          {state.bookMark.searchText &&
            state.bookMark.searchBookMarks.map((bookMark) => {
              if (bookMark.folderId === state.sideBar.selectId) {
                return (
                  <Grid item xs={3} key={bookMark.bookMarkId}>
                    <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
                  </Grid>
                );
              }
            })}
        </MediaQuery>
        <MediaQuery query="(max-width: 1023px)">
          {!state.bookMark.searchText &&
            state.bookMark.bookMarks.map((bookMark) => {
              if (bookMark.folderId === state.sideBar.selectId) {
                return (
                  <Grid item xs={6} key={bookMark.bookMarkId}>
                    <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
                  </Grid>
                );
              }
            })}
          {state.bookMark.searchText &&
            state.bookMark.searchBookMarks.map((bookMark) => {
              if (bookMark.folderId === state.sideBar.selectId) {
                return (
                  <Grid item xs={6} key={bookMark.bookMarkId}>
                    <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
                  </Grid>
                );
              }
            })}
        </MediaQuery>
      </Grid>
      {CreateBookmarkDialog}
      {EditBookmarkDialog}
      {memoDialog}
    </div>
  );
};

export default BookMark;
