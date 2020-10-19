import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import NavigationBar from '../navigationBar/navigationBar';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '45%',
      margin: '180px 8%',
      textAlign: 'left',
      ['@media(max-width:1024px)']: {
        width: '95%',
        margin: '180px auto',
        textAlign: 'left',
      },
      ['@media(max-width:767px)']: {
        width: '95%',
        margin: '75px auto 50px auto',
        textAlign: 'left',
      },
    },
    title: {
      fontSize: '44px',
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: '50px',
      ['@media(max-width:767px)']: {
        fontSize: '36px',
      },
    },
    description: {
      fontSize: '20px',
      marginBottom: '40px',
      fontWeight: theme.typography.fontWeightMedium,
      ['@media(max-width:767px)']: {
        fontSize: '18px',
        marginBottom: '30px',
      },
    },
    button: {
      marginRight: '40px',
      fontWeight: theme.typography.fontWeightBold,
      ['@media(max-width:767px)']: {
        display: '-webkit-box' && '-moz-box' && '-ms-flexbox' && '-webkit-flex' && 'flex',
        margin: '0 auto',
      },
    },
  })
);

const Home = () => {
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
          ・お気に入りサイトのURLを保存することができ、ブックマークアプリからアクセスすることができます。
        </Typography>
        <Typography color={'primary'} className={classes.description}>
          ・PC, モバイル、タブレット間でブックマークを共有することができます。
        </Typography>
        <Typography color={'primary'} className={classes.description}>
          ・メモ機能がついており、大事な部分をメモできます(マークダウン対応)
        </Typography>
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              Router.push('./signIn');
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
export default Home;
