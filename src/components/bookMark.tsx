import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';
import Card from '@material-ui/core/Card';

import BookmarkItem from './bookMarkItem';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '83%',
      //   margin: '0 auto',
      marginTop: '124px',
      marginLeft: '250px',
      //   border: '1px solid red',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const BookMark = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default BookMark;
