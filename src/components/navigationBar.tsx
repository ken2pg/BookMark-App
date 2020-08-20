import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    title: {
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
);

const navigationBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>BookMark-App</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default navigationBar;
