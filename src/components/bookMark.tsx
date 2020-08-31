import React from 'react';

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
      marginTop: '200px',
      marginLeft: '250px',
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* <MediaQuery query="(max-width: 1024px)"> */}
        {[1, 2, 3, 4].map((listItem) => {
          return (
            <Grid item xs={3} key={listItem}>
              <BookmarkItem />
            </Grid>
          );
        })}
        {/* </MediaQuery> */}
      </Grid>
    </div>
  );
};

export default BookMark;
