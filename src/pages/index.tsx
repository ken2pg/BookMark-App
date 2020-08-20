import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// export default () => <div>Hello World</div>;
import NavigationBar from '../components/navigationBar';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      margin: '50px auto',
    },
  })
);

const Index = () => {
  // const classes = useStyle();

  return (
    <>
      <NavigationBar />
    </>
  );
};

export default Index;
