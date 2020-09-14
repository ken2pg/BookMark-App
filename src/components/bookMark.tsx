import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80.5%',
      //   margin: '0 auto',
      marginTop: '74px',
      marginLeft: '290px',
      //   border: '1px solid red',
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
    },
    button: {},
    iconButton: {
      padding: 10,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    // divider: {
    //   height: 28,
    //   margin: 4,
    // },
  })
);

const BookMark = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const [count, setCount] = React.useState(0);
  useEffect(() => {
    if (state.signIn.isLogin && state.signIn.isFirstRenderBookMark) {
      dispatch(fetchInitialState());
      dispatch(fetchSerialNumber());
      dispatch(signInSlice.actions.firstRenderBookMark());
    }
    // setCount(1);
  }, [count]);

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
        <DialogTitle id="max-width-dialog-title">Add Site Name, URL and Memo</DialogTitle>
        <DialogContent>
          <DialogContentText>Plese input site name, url and memo!</DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleInputChange}
          className={classes.textfield}
          id="Site Name"
          label="Site Name"
        />
        <TextField
          onChange={handleInputURLChange}
          className={classes.textfield}
          id="Site URL"
          label="Site URL"
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputMemo(e.target.value));
          }}
          className={classes.textfield}
          id="Site Memo"
          label="Site Memo"
        />
        <DialogActions>
          <Button autoFocus onClick={cancelNewCreate} color="primary">
            <Box className={classes.button}>Cancel</Box>
          </Button>
          <Button
            onClick={() => {
              addNewBookMark();
              dispatch(bookMarkSlice.actions.searchOutput());
              dispatch(fetchAddBookMark(state.bookMark.newBookMark));
              dispatch(fetchEditSerialNumber(state.bookMark.serialNumbers));
            }}
            disabled={isNameNull}
            color="primary"
          >
            OK
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
        <DialogTitle id="max-width-dialog-title">Edit Site Name, URL and Memo</DialogTitle>
        <DialogContent>
          <DialogContentText>Plese input site name, url, memo!</DialogContentText>
        </DialogContent>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditName(e.target.value));
          }}
          className={classes.textfield}
          id="Site Name"
          label="Site Name"
          value={state.bookMark.editSaveFolder.siteName}
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditURL(e.target.value));
          }}
          className={classes.textfield}
          id="Site URL"
          label="Site URL"
          value={state.bookMark.editSaveFolder.siteURL}
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditMemo(e.target.value));
          }}
          className={classes.textfield}
          id="Site Memo"
          label="Site Memo"
          value={state.bookMark.editSaveFolder.memo}
        />
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              dispatch(bookMarkSlice.actions.endEditBookMark());
            }}
            color="primary"
          >
            <Box className={classes.button}>Cancel</Box>
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
          >
            OK
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
        <DialogTitle id="max-width-dialog-title">Memo</DialogTitle>
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

  return (
    <div className={classes.root}>
      {/* header */}
      <div className={classes.header}>
        <IconButton
          color="primary"
          component="span"
          onClick={() => {
            createNewBookMark();
            dispatch(bookMarkSlice.actions.selectId(state.sideBar.selectId));
          }}
        >
          <AddIcon />
        </IconButton>
        <Paper className={classes.headerSearch} elevation={0} variant="outlined">
          <InputBase
            className={classes.input}
            placeholder="Search BookMark"
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

      <Grid container spacing={3}>
        <MediaQuery query="(min-width: 1024px)">
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
