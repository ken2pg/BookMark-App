import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Button, Typography, TextField, ButtonGroup } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import NavigationBar from '../navigationBar/navigationBar';
import { signInSlice, fetchSingIn } from '#/slices/signInPageSlice';
import { NextPage } from 'next';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Router from 'next/router';
import { fetchGetUserInfo } from '../../slices/userInfoSlice';
import { count } from 'console';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      margin: '150px auto',
      // border: '1px solid red',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '44px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    textfield: {
      width: '350px',
      margin: '0 auto',
      marginBottom: '50px',
    },
    button: {
      margin: '0 20px',
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const SignInForm = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const focusPassword = useRef(null);
  const focusEmail = useRef(null);
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    focusEmail.current.focus();
  }, [count]);
  return (
    <>
      <NavigationBar />
      <div className={classes.root}>
        <Typography color={'primary'} className={classes.title}>
          {/* Sign in */}
          サインイン
        </Typography>
        <TextField
          inputRef={focusEmail}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              focusPassword.current.focus();
            }
          }}
          className={classes.textfield}
          id="Email"
          label="Email"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(signInSlice.actions.inputEmail(e.target.value));
          }}
          value={state.signIn.email}
        ></TextField>

        <FormControl className={classes.textfield} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                dispatch(fetchSingIn(state.signIn));
              }
            }}
            inputRef={focusPassword}
            id="outlined-adornment-password"
            type={state.signIn.showPassword ? 'text' : 'password'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(signInSlice.actions.inputPassWord(e.target.value));
            }}
            value={state.signIn.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    dispatch(signInSlice.actions.switchShowPassword());
                  }}
                  edge="end"
                >
                  {state.signIn.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <div className={classes.button}>
          <Button
            onClick={() => {
              dispatch(fetchSingIn(state.signIn));
            }}
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            サインイン
          </Button>
          {/* <Button variant="contained" color="primary" className={classes.button}>
            アカウント登録
          </Button> */}
          {/* <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              Router.push('./signIn');
            }}
          >
            このページ
          </Button> */}
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              Router.push('./');
            }}
          >
            戻る
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
