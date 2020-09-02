import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NavigationBar from '../components/navigationBar';
import BookMarkComponent from '../components/bookMarkComponent';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      margin: '50px auto',
    },
  })
);

const Index = () => {
  const classes = useStyle();

  return (
    <>
      <NavigationBar />
      <BookMarkComponent />
    </>
  );
};

export default Index;
