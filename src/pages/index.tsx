import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// export default () => <div>Hello World</div>;

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      margin: '50px auto',
    },
  })
);

const App = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </div>
  );
};

export default App;
