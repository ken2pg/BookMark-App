import React, { useEffect } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NavigationBar from '../components/navigationBar';
import SignInForm from '../components/signInForm';

import { NextPage } from 'next';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SignIn = () => {
  return (
    <>
      <NavigationBar />
      <SignInForm />
    </>
  );
};

export default SignIn;
