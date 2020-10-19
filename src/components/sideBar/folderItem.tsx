import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';
import CardActionArea from '@material-ui/core/CardActionArea';

import { sideBarSlice, fetchDeleteBookMarkFolder } from '../../slices/sideBarSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { navigationBarSlice } from '#/slices/navigationBarSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      textAlign: 'center',
      fontSize: '24px',
      width: '100%',
    },
    btn: {
      fontWeight: 'bold',
    },
    item: {
      lineHeight: '33px',
      wordWrap: 'break-word',
    },
    folder: {
      position: 'relative',
      top: '4px',
    },
    selectFolder: {
      color: '#556cd6',
      position: 'relative',
      top: '4px',
      ['@media(max-width:767px)']: {
        position: 'relative',
        top: '3px',
      },
    },
    selectItem: {
      color: '#556cd6',
      wordWrap: 'break-word',
      lineHeight: '33px',
    },
  })
);

interface Props {
  folder: {
    userId: number;
    folderId: number;
    folderName: string;
    folderColor: string;
    isEdit: boolean;
    isSelect: boolean;
  };
}

const FolderItem: React.FC<Props> = ({ folder }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const ITEM_HEIGHT = 48;
  const options = ['編集', '削除', 'キャンセル'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const startEdit = (folderID: number) => {
    dispatch(sideBarSlice.actions.startEditFolder(folderID));
  };

  const selectFolderChangeNameColorSmartPhone = (
    <>
      <Box
        style={{
          height: '50px',
        }}
      >
        <CardActionArea style={{ height: '50px' }}>
          <Grid container>
            <Grid
              item
              xs={3}
              className={classes.item}
              onClick={() => {
                dispatch(sideBarSlice.actions.selectFolder(folder.folderId));
                dispatch(navigationBarSlice.actions.CloseMenuDrower());
                dispatch(navigationBarSlice.actions.changefooterButtonNumber(1));
              }}
            >
              <span
                style={{
                  color: '#556cd6',
                  position: 'relative',
                  left: '5px',
                  lineHeight: '67px',
                }}
              >
                <FolderIcon></FolderIcon>
              </span>
            </Grid>
            <Grid
              item
              xs
              onClick={() => {
                dispatch(sideBarSlice.actions.selectFolder(folder.folderId));
                dispatch(navigationBarSlice.actions.CloseMenuDrower());
                dispatch(navigationBarSlice.actions.changefooterButtonNumber(1));
              }}
            >
              <span
                style={{
                  color: '#556cd6',
                  position: 'relative',
                  lineHeight: '52px',
                  fontSize: '16px',
                }}
              >
                <MediaQuery query="(min-width: 359px)">
                  {folder.folderName.length > 10 && <>{folder.folderName.slice(0, 10) + '...'}</>}
                  {!(folder.folderName.length > 10) && <>{folder.folderName}</>}
                </MediaQuery>
                <MediaQuery query="(max-width: 359px)">
                  {folder.folderName.length > 8 && <>{folder.folderName.slice(0, 8) + '...'}</>}
                  {!(folder.folderName.length > 8) && <>{folder.folderName}</>}
                </MediaQuery>
              </span>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
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
                  if (option === '編集') {
                    handleClose();
                    startEdit(folder.folderId);
                    // startEdit();
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
        </CardActionArea>
      </Box>
    </>
  );
  const notselectFolderChangeNameColorSmartPhone = (
    <>
      <Box
        style={{
          height: '50px',
          // borderBottom: '1px solid gray',
        }}
      >
        <CardActionArea style={{ height: '50px' }}>
          <Grid container>
            <Grid
              item
              xs={3}
              className={classes.item}
              onClick={() => {
                dispatch(sideBarSlice.actions.selectFolder(folder.folderId));
                dispatch(navigationBarSlice.actions.CloseMenuDrower());
                dispatch(navigationBarSlice.actions.changefooterButtonNumber(1));
              }}
            >
              <span
                style={{
                  color: 'gray',
                  position: 'relative',
                  left: '5px',
                  lineHeight: '67px',
                }}
              >
                <FolderIcon></FolderIcon>
              </span>
            </Grid>
            <Grid
              item
              xs
              onClick={() => {
                dispatch(sideBarSlice.actions.selectFolder(folder.folderId));
                dispatch(navigationBarSlice.actions.CloseMenuDrower());
                dispatch(navigationBarSlice.actions.changefooterButtonNumber(1));
              }}
            >
              <span
                style={{
                  position: 'relative',
                  lineHeight: '52px',
                  fontSize: '16px',
                  // top: '3px',
                  // left: '10px',
                }}
              >
                <MediaQuery query="(min-width: 359px)">
                  {folder.folderName.length > 10 && <>{folder.folderName.slice(0, 10) + '...'}</>}
                  {!(folder.folderName.length > 10) && <>{folder.folderName}</>}
                </MediaQuery>
                <MediaQuery query="(max-width: 359px)">
                  {folder.folderName.length > 8 && <>{folder.folderName.slice(0, 8) + '...'}</>}
                  {!(folder.folderName.length > 8) && <>{folder.folderName}</>}
                </MediaQuery>
              </span>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
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
                  if (option === '編集') {
                    handleClose();
                    startEdit(folder.folderId);
                    // startEdit();
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
        </CardActionArea>
      </Box>
    </>
  );

  //確認ダイアログ
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
              dispatch(sideBarSlice.actions.deleteFolder(folder.folderId));
              dispatch(fetchDeleteBookMarkFolder(folder));
              setIsOpenDialog(false);
            }}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  //PC版sideBarフォルダー
  const sideBarPC = (
    <>
      <Grid container>
        {/* 1023px以上ならフォルダー名を10文字まで表示 */}
        <MediaQuery query="(min-width: 1023px)">
          <Grid item xs={2}>
            {folder.isSelect && (
              <ListItemIcon className={classes.selectFolder}>
                <FolderIcon></FolderIcon>
              </ListItemIcon>
            )}
            {!folder.isSelect && (
              <ListItemIcon className={classes.folder}>
                <FolderIcon></FolderIcon>
              </ListItemIcon>
            )}
          </Grid>
          <Grid item>
            {folder.isSelect && (
              <Typography className={classes.selectItem}>
                <Box>
                  {() => {
                    if (folder.folderName.length > 8) {
                      return folder.folderName.slice(0, 8) + '...';
                    }
                    return folder.folderName;
                  }}
                </Box>
              </Typography>
            )}
            {!folder.isSelect && (
              <Typography className={classes.item}>
                <Box>
                  {() => {
                    if (folder.folderName.length > 10) {
                      return folder.folderName.slice(0, 8) + '...';
                    }
                    return folder.folderName;
                  }}
                </Box>
              </Typography>
            )}
          </Grid>
        </MediaQuery>
        {/* 1023px未満なら8文字まで表示 */}
        <MediaQuery query="(max-width: 1023px)">
          <Grid item xs={2}>
            {folder.isSelect && (
              <ListItemIcon className={classes.selectFolder}>
                <FolderIcon></FolderIcon>
              </ListItemIcon>
            )}
            {!folder.isSelect && (
              <ListItemIcon className={classes.folder}>
                <FolderIcon></FolderIcon>
              </ListItemIcon>
            )}
          </Grid>
          <Grid item>
            {folder.isSelect && (
              <Typography className={classes.selectItem}>
                <Box>
                  {() => {
                    if (folder.folderName.length > 8) {
                      return folder.folderName.slice(0, 8) + '...';
                    }
                    return folder.folderName;
                  }}
                </Box>
              </Typography>
            )}
            {!folder.isSelect && (
              <Typography className={classes.item}>
                <Box>
                  {() => {
                    if (folder.folderName.length > 8) {
                      return folder.folderName.slice(0, 8) + '...';
                    }
                    return folder.folderName;
                  }}
                </Box>
              </Typography>
            )}
          </Grid>
        </MediaQuery>
      </Grid>
      <Typography className={classes.btn}>
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
                if (option === '編集') {
                  handleClose();
                  startEdit(folder.folderId);
                  // startEdit();
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
      {confirmDialog}
    </>
  );

  const sideBarMobile = (
    <>
      {folder.isSelect && selectFolderChangeNameColorSmartPhone}
      {!folder.isSelect && notselectFolderChangeNameColorSmartPhone}
      {confirmDialog}
    </>
  );

  return (
    <>
      {<MediaQuery query="(min-width: 767px)">{sideBarPC}</MediaQuery>}
      {<MediaQuery query="(max-width: 767px)">{sideBarMobile}</MediaQuery>}
    </>
  );
};
export default FolderItem;
