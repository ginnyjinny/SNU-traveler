
import React, { Component } from 'react'
import { string } from 'prop-types'

import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'


import { withStyles } from '@material-ui/core/styles';


//
import EmptyState from '../EmptyState';
//


import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

firebase.analytics();

//connect to database
const sendPost = () => {
  const newPostKey = firebase.database().ref().child('postlist').child('seoul').push().key;
  
  const updates = {};
  updates['/postlist/seoul/' + newPostKey] = 'postData';
  //updates['/user-posts/seoul/' + uid + '/' + newPostKey] = postData;
  alert(newPostKey);
  return firebase.database().ref().update(updates);
  ///
  const dbRefObject = firebase.database().ref().child('postlist').child('seoul').child('post1');
  dbRefObject.on('value', snap => alert(snap.val()));
}




const styles = (theme) => ({});

const WritePost = (props) =>{


    return (
      <div>
        <form style={{ padding: 24 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="제목"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="글"
                margin="normal"
                multiline
                required
                rows={4}
                rowsMax={100}
              />
              
            </Grid>
          </Grid>
        </form>
        <Button fullWidth onClick={()=>sendPost()}>
            글작성하기
        </Button>
        
        <EmptyState
        button="뒤로가기"
        buttonLink="/posts"
      />
      
      </div>
    )
  
}



export default withStyles(styles)(WritePost);