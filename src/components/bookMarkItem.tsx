import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { bookMarkSlice } from '#/slices/bookMarkSlice';
import { fetchDeleteBookMark } from '#/slices/bookMarkSlice';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {},
    name: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    text: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    cardContent: {},
    btn: {
      marginLeft: '10px',
      marginTop: '-10px',
      marginBottom: '5px',
    },
  })
);
interface Props {
  bookMarkContents: {
    userId: number;
    folderId: number;
    bookMarkId: number;
    siteName: string;
    siteURL: string;
    date: string;
    isEdit: boolean;
    memo: string;
    isMemoOpen: boolean;
  };
}
const BookMarkItem: React.FC<Props> = ({ bookMarkContents }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const startEditBookMark = () => {
    dispatch(bookMarkSlice.actions.startEditBookMark());
  };
  //   const text: string = 'http://www.google.com/s2/favicons?domain=https://github.com';
  //   const text: string = 'http://www.yahoo.co.jp/aaa.jpg';
  return (
    <>
      <Card>
        {/* <CardActionArea> */}
        <CardMedia />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.name}>{bookMarkContents.siteName}</Typography>
          <Typography color="textSecondary" className={classes.text}>
            URL {bookMarkContents.siteURL}
          </Typography>
          <Typography color="textSecondary" className={classes.text}>
            Date {bookMarkContents.date}
          </Typography>
        </CardContent>
        {/* </CardActionArea> */}
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => {
            dispatch(bookMarkSlice.actions.openMemoDialog(bookMarkContents));
          }}
        >
          Memo
        </Button>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => {
            dispatch(bookMarkSlice.actions.startEditBookMark(bookMarkContents.bookMarkId));
          }}
        >
          Edit
        </Button>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => {
            dispatch(bookMarkSlice.actions.deleteBookMark(bookMarkContents.bookMarkId));
            dispatch(bookMarkSlice.actions.searchOutput());
            dispatch(fetchDeleteBookMark(bookMarkContents.bookMarkId));
          }}
        >
          Delete
        </Button>
      </Card>
    </>
  );
};

export default BookMarkItem;
