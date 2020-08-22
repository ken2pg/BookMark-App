import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '30%',
      margin: '25px 0',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
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
  };
}

const FolderItem: React.FC<Props> = ({ folder }) => {
  const classes = useStyles();
  return (
    <div>
      <p>{folder.folderName}</p>
    </div>
  );
};
export default FolderItem;
