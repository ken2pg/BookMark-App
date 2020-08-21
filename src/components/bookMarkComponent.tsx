import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideBar from '../components/sideBar';

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
    </>
  );
};

export default BookMarkComponent;
