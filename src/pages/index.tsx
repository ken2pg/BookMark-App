import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NavigationBar from '../components/navigationBar/navigationBar';
import Home from '#/components/home/home';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const Index = () => {
  return (
    <>
      <NavigationBar />
      <Home />
    </>
  );
};
export default Index;
