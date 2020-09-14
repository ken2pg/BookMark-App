import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { sideBarSlice, fetchDeleteBookMarkFolder } from '../../slices/sideBarSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '30%',
      // margin: '25px 0',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
    },
    iconButton: {
      marginLeft: '40px',
    },
    btn: {
      //  zIndex: 3000,
      //  backgroundColor: 'white'
    },
    item: { width: '100px', wordWrap: 'break-word' },
    selectFolder: {
      color: '#556cd6',
    },
    selectItem: {
      color: '#556cd6',
      width: '100px',
      wordWrap: 'break-word',
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const startEdit = () => {
  //   dispatch(sideBarSlice.actions.startEditFolder());
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(sideBarSlice.actions.inputName(e.target.value));
  // };
  // const cancelEdit = () => {
  //   dispatch(sideBarSlice.actions.endEditFolder());
  // };

  const handleDelete = (Id: number) => {
    dispatch(sideBarSlice.actions.deleteFolder(Id));
    dispatch(fetchDeleteBookMarkFolder(Id));
  };

  const startEdit = (folderID: number) => {
    dispatch(sideBarSlice.actions.startEditFolder(folderID));
  };
  const options = ['Edit', 'Delete', 'Cancel'];

  const selectFolderChangeNameColor = (
    <>
      <ListItemIcon className={classes.selectFolder}>
        <FolderIcon></FolderIcon>
      </ListItemIcon>
      <Typography className={classes.selectItem}>
        <Box>{folder.folderName}</Box>
      </Typography>
    </>
  );
  const notselectFolderChangeNameColor = (
    <>
      <ListItemIcon>
        <FolderIcon></FolderIcon>
      </ListItemIcon>
      <Typography className={classes.item}>
        <Box>{folder.folderName}</Box>
      </Typography>
    </>
  );

  return (
    <>
      {folder.isSelect && selectFolderChangeNameColor}
      {!folder.isSelect && notselectFolderChangeNameColor}
      <Typography className={classes.btn}>
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
                if (option === 'Edit') {
                  handleClose();
                  startEdit(folder.folderId);
                  // startEdit();
                } else if (option === 'Delete') {
                  handleClose();
                  handleDelete(folder.folderId);
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
    </>
  );
};
export default FolderItem;
