import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import NavigationBar from '../components/navigationBar';
import BookMarkComponent from '../components/bookMarkComponent';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '45%',
      margin: '180px 8%',
      textAlign: 'left',
    },
    title: {
      // margin: '200px,auto',
      fontSize: '44px',
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: '50px',
    },
    description: {
      fontSize: '20px',
      marginBottom: '40px',
      fontWeight: theme.typography.fontWeightMedium,
    },
    button: {
      marginRight: '40px',
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const Index = () => {
  const classes = useStyle();
  return (
    <>
      <NavigationBar />
      <div className={classes.root}>
        <Typography color={'primary'} className={classes.title}>
          {/* Online BookMark Application for PC, Tablet, and Mobile */}
          PC, タブレット, モバイルで使えるオンラインブックマークアプリ
        </Typography>
        <Typography color={'primary'} className={classes.description}>
          {/* You can save your favorite site's URL and it can be shared and used by your PC, tablet and
          mobile */}
          ・お気に入りのサイトURLを保存することができ、いつでもすぐにブックマークアプリからアクセスすることができます。
        </Typography>
        <Typography color={'primary'} className={classes.description}>
          ・またPC, モバイル、タブレット間でブックマークを共有することができます。
        </Typography>
        <Typography color={'primary'} className={classes.description}>
          ・メモ機能がついており、大事な部分をメモできます
        </Typography>
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              Router.push({ pathname: './signIn' });
            }}
          >
            サインイン
          </Button>
          {/* <Button className={classes.button} variant="contained" color="primary">
            アカウント登録
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default Index;
