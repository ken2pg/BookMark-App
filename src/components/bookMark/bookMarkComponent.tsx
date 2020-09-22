import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideBar from '../sideBar/sideBar';
import BookMark from './bookMark';
import { useSelector } from 'react-redux';
import { RootState } from '#/store';
import MediaQuery from 'react-responsive';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const BookMarkComponent = () => {
  // const classes = useStyle();
  const state = useSelector((state: RootState) => state);
  return (
    <>
      <SideBar />
      <MediaQuery query="(min-width: 767px)">
        <BookMark />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        {!state.navigationBar.isOpenMenuDialog && <BookMark />}
      </MediaQuery>
    </>
  );
};

export default BookMarkComponent;
