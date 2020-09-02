import React from 'react';
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

import BookmarkItem from './bookMarkItem';
import { bookMarkSlice } from '#/slices/bookMarkSlice';
import { bookMark } from '#/types/bookMark';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80.5%',
      //   margin: '0 auto',
      marginTop: '74px',
      marginLeft: '290px',
      //   border: '1px solid red',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    header: {
      marginBottom: '10px',
    },
    textfield: {
      width: '92%',
      margin: '0 auto',
      marginBottom: '30px',
    },
    button: {},
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
    dispatch(bookMarkSlice.actions.endCreateBookMark());
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
  const isEditNameNull = !state.bookMark.editSiteName;

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
        <DialogTitle id="max-width-dialog-title">Add Site Name and URL</DialogTitle>
        <DialogContent>
          <DialogContentText>Plese input site name and url!</DialogContentText>
        </DialogContent>
        <TextField
          onChange={handleInputChange}
          className={classes.textfield}
          id="Site Name"
          label="Site Name"
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     e.target.addEventListener('blur', pause);
          //   }
          // }}
        />
        {/* <DialogContent>
          <DialogContentText>Plese input site url!</DialogContentText>
        </DialogContent> */}
        <TextField
          onChange={handleInputURLChange}
          className={classes.textfield}
          id="Site URL"
          label="Site URL"
        />
        <DialogActions>
          <Button autoFocus onClick={cancelNewCreate} color="primary">
            <Box className={classes.button}>Cancel</Box>
          </Button>
          <Button onClick={addNewBookMark} disabled={isNameNull} color="primary">
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
        <DialogTitle id="max-width-dialog-title">Edit Site Name and URL</DialogTitle>
        <DialogContent>
          <DialogContentText>Plese input site name and url!</DialogContentText>
        </DialogContent>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditName(e.target.value));
          }}
          className={classes.textfield}
          id="Site Name"
          label="Site Name"
          value={state.bookMark.editSiteName}
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     e.target.addEventListener('blur', pause);
          //   }
          // }}
        />
        {/* <DialogContent>
          <DialogContentText>Plese input site url!</DialogContentText>
        </DialogContent> */}
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(bookMarkSlice.actions.inputEditURL(e.target.value));
          }}
          className={classes.textfield}
          id="Site URL"
          label="Site URL"
          value={state.bookMark.editSiteUrl}
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

  //memoボタンが押されるたびにbookMarkItemに対象のbookmarkが変数に入れられる。
  let bookMarkItem = state.bookMark.newBookMark;
  state.bookMark.bookMarks.map((bookMark) => {
    if (bookMark.isMemoOpen) {
      bookMarkItem = bookMark;
    }
  });
  // const Index = state.bookMark.bookMarks.findIndex((t) => t.isMemoOpen === true);
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
          <DialogContentText>{bookMarkItem.siteName}</DialogContentText>
          <DialogContentText>{bookMarkItem.memo}</DialogContentText>
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
          <Button
            // onClick={() => {
            //   dispatch(bookMarkSlice.actions.changeBookMark());
            //   dispatch(bookMarkSlice.actions.endEditBookMark());
            // }}
            disabled={isEditNameNull}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton
          color="primary"
          component="span"
          onClick={() => {
            createNewBookMark();
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Grid container spacing={3}>
        <MediaQuery query="(min-width: 1024px)">
          {state.bookMark.bookMarks.map((bookMark) => {
            return (
              <Grid item xs={3} key={bookMark.bookMarkId}>
                <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
              </Grid>
            );
          })}
        </MediaQuery>
        <MediaQuery query="(max-width: 1023px)">
          {state.bookMark.bookMarks.map((bookMark) => {
            return (
              <Grid item xs={6} key={bookMark.bookMarkId}>
                <BookmarkItem bookMarkContents={bookMark} key={bookMark.bookMarkId} />
              </Grid>
            );
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
