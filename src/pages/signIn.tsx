import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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

import NavigationBar from '../components/navigationBar';
import { signInSlice, fetchSingIn } from '#/slices/signInPageSlice';

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
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    textfield: {
      width: '350px',
      margin: '0 auto',
      marginBottom: '50px',
    },
    button: {},
  })
);

const SignIn = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  return (
    <>
      <NavigationBar />
      <div className={classes.root}>
        <Typography color={'primary'} className={classes.title}>
          Sign in
        </Typography>
        <TextField
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
          >
            Sign In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
