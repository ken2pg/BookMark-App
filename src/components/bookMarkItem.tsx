import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const BookMarkItem = () => {
  const classes = useStyle();

  return (
    <>
      <Paper className={classes.root}>sample</Paper>
    </>
  );
};

export default BookMarkItem;
