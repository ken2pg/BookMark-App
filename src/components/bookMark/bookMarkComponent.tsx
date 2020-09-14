import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideBar from '../sideBar/sideBar';
import BookMark from './bookMark';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const BookMarkComponent = () => {
  // const classes = useStyle();

  return (
    <>
      <SideBar />
      <BookMark />
    </>
  );
};

export default BookMarkComponent;
