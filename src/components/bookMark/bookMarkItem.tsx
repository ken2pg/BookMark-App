import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '24px',
      marginBottom: '10px',
    },
    text: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    cardContent: {},
    btn: {
      fontWeight: 'bold',
      marginLeft: '25px',
      marginTop: '-10px',
      marginBottom: '5px',
    },
    iconButton: { marginTop: '-8px' },
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ['メモ', '編集', '削除', 'キャンセル'];
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const startEditBookMark = () => {
    dispatch(bookMarkSlice.actions.startEditBookMark());
  };
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const confirmDialog = (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">確認</DialogTitle>
        <DialogContent>
          <DialogContentText>削除してもよろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className={classes.btn}
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            取り消し
          </Button>
          <Button
            color="primary"
            className={classes.btn}
            onClick={() => {
              dispatch(bookMarkSlice.actions.deleteBookMark(bookMarkContents.bookMarkId));
              dispatch(bookMarkSlice.actions.searchOutput());
              dispatch(fetchDeleteBookMark(bookMarkContents));
              setIsOpenDialog(false);
            }}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  //   const text: string = 'http://www.google.com/s2/favicons?domain=https://github.com';
  //   const text: string = 'http://www.yahoo.co.jp/aaa.jpg';
  return (
    <>
      <Card>
        {/* <CardActionArea> */}
        <CardMedia />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.name}>
            {bookMarkContents.siteName}
            {/* <IconButton className={classes.iconButton} onClick={handleClick}> */}
            <IconButton className={classes.iconButton} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={() => {
                    if (option === 'メモ') {
                      handleClose();
                      dispatch(bookMarkSlice.actions.openMemoDialog(bookMarkContents));
                    } else if (option === '編集') {
                      handleClose();
                      dispatch(
                        bookMarkSlice.actions.startEditBookMark(bookMarkContents.bookMarkId)
                      );
                    } else if (option === '削除') {
                      handleClose();
                      setIsOpenDialog(true);
                    } else {
                      handleClose();
                    }
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Typography>
          {bookMarkContents.siteURL && (
            <Typography color="textSecondary" className={classes.text}>
              {bookMarkContents.siteURL}
            </Typography>
          )}
          {!bookMarkContents.siteURL && (
            <Typography color="textSecondary" className={classes.text}>
              None URL
            </Typography>
          )}
          {/* <Typography color="textSecondary" className={classes.text}>
            {bookMarkContents.date}
          </Typography> */}
        </CardContent>
        {/* </CardActionArea> */}
        {/* <Button
          color="primary"
          className={classes.btn}
          onClick={() => {
            dispatch(bookMarkSlice.actions.openMemoDialog(bookMarkContents));
          }}
        >
          メモ
        </Button>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => {
            dispatch(bookMarkSlice.actions.startEditBookMark(bookMarkContents.bookMarkId));
          }}
        >
          編集
        </Button>
        <Button color="primary" className={classes.btn} onClick={() => setIsOpenDialog(true)}>
          削除
        </Button> */}
      </Card>
      {confirmDialog}
    </>
  );
};

export default BookMarkItem;
