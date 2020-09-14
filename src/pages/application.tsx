import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import NavigationBar from '../components/navigationBar/navigationBar';
import BookMarkComponent from '../components/bookMark/bookMarkComponent';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      margin: '50px auto',
    },
  })
);

const Appliaction = () => {
  const classes = useStyle();
  const state = useSelector((state: RootState) => state);

  const [count, setCount] = React.useState(0);
  let components: JSX.Element = <></>;
  // let isSignIn = false;
  useEffect(() => {
    if (!state.signIn.isLogin) {
      Router.push({ pathname: './signIn' });
    }
  }, [count]);

  //他のuseEffectはログイン状態がtrueだったら取得するように変更
  //localstageにログイン状態を保存
  //const にreturn内容を入れておいてtrueの場合だけ表示するようにする
  return (
    <>
      <NavigationBar />
      <BookMarkComponent />
    </>
  );
};
export default Appliaction;
