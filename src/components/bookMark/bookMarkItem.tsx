import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
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
      height: '70px',
    },
    image: {},
    name: {
      wordWrap: 'break-word',
      height: '70px',
      fontSize: '20px',
      width: '100%',
      paddingTop: '10px',
      paddingLeft: '10px',

      ['@media(max-width:767px)']: {
        fontSize: '18px',
      },
    },
    text: {
      wordWrap: 'break-word',
      fontSize: '14px',
      ['@media(max-width:767px)']: {
        fontSize: '14px',
      },
    },
    container: {
      display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
      justifyContent: 'space-between',
    },
    btn: {
      fontWeight: 'bold',
      marginLeft: '25px',
      marginTop: '-10px',
      marginBottom: '5px',
    },
    iconButton: {
      ['@media(max-width:767px)']: {},
    },
    bookMarkName: {
      display: 'none',
      ['@media(min-width:1200px)']: {
        display: 'inline-block',
      },
    },
    bookMarkName0: {
      display: 'none',
      ['@media(min-width:1030px)and (max-width:1199px)']: {
        display: 'inline-block',
      },
    },
    bookMarkName1: {
      display: 'none',
      ['@media(min-width:766px) and (max-width:1030px)']: {
        display: 'inline-block',
      },
    },
    bookMarkName2: {
      display: 'none',
      ['@media(min-width:361px) and (max-width:766px)']: {
        display: 'inline-block',
      },
    },
    bookMarkName3: {
      display: 'none',
      ['@media(max-width:360px)']: {
        display: 'inline-block',
      },
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const options = ['メモ', '編集', '削除', 'キャンセル'];
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  //favicon用URL
  const imgUrl = 'https://www.google.com/s2/favicons?domain=' + bookMarkContents.siteURL;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <Box className={classes.container}>
            <Box
              className={classes.name}
              onClick={() => {
                if (anchorEl === null) {
                  window.open(bookMarkContents.siteURL);
                }
              }}
            >
              <div className={classes.bookMarkName}>
                <img src={imgUrl} />
                {bookMarkContents.siteName.length > 20 &&
                  bookMarkContents.siteName.slice(0, 20) + '...'}
                {!(bookMarkContents.siteName.length > 20) && bookMarkContents.siteName}
              </div>
              <div className={classes.bookMarkName0}>
                <img src={imgUrl} />
                {bookMarkContents.siteName.length > 10 &&
                  bookMarkContents.siteName.slice(0, 10) + '...'}
                {!(bookMarkContents.siteName.length > 10) && bookMarkContents.siteName}
              </div>
              <div className={classes.bookMarkName1}>
                <img src={imgUrl} />
                {bookMarkContents.siteName.length > 9 &&
                  bookMarkContents.siteName.slice(0, 9) + '...'}
                {!(bookMarkContents.siteName.length > 9) && bookMarkContents.siteName}
              </div>
              <div className={classes.bookMarkName2}>
                <img src={imgUrl} />
                {bookMarkContents.siteName.length > 10 &&
                  bookMarkContents.siteName.slice(0, 10) + '...'}
                {!(bookMarkContents.siteName.length > 10) && bookMarkContents.siteName}
              </div>
              <div className={classes.bookMarkName3}>
                <img src={imgUrl} />
                {bookMarkContents.siteName.length > 8 &&
                  bookMarkContents.siteName.slice(0, 8) + '...'}
                {!(bookMarkContents.siteName.length > 8) && bookMarkContents.siteName}
              </div>
            </Box>

            <Box className={classes.iconButton}>
              <IconButton onClick={handleClick}>
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
            </Box>
          </Box>
          {confirmDialog}
        </CardActionArea>
      </Card>
    </>
  );
};

export default BookMarkItem;
