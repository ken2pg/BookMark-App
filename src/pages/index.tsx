import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import NavigationBar from '../components/navigationBar';
import BookMarkComponent from '../components/bookMarkComponent';
import Home from '#/components/home';

import { NextPage } from 'next';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

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
