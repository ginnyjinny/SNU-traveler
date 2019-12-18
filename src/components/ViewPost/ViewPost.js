import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';

import renderHTML from 'react-render-html';
import { IconButton, TextField, CardHeader, CardMedia, CardContent, CardActions, Avatar, Container, Paper, Divider, Textfield, Input, FormControl, Button, ButtonGroup, InputLabel, Typography, Grid, Card, OutlinedInput } from '@material-ui/core/';
import { makeStyles, withStyles } from '@material-ui/styles';
import AddCommentIcon from '@material-ui/icons/AddComment';
import clsx from 'clsx';

import FollowButton from './FollowButton';
import LikeButton from './LikeButton';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/functions';


const styles = (theme) => ({
    postHeader: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
    },
    title:{
        padding: '10px',
    },
    card:{
        height:'100%',
        display: 'flex',
        flexDirection: 'column',
    },
    reply:{
        display:'flex',
        flexDirection:'column'
    },
    enterReply:{

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
})

class Reply extends Component {
}

const ViewPost = (props) => {
  const { classes } = props;
  const userUid = props.location.state.user;
  const { post } = props.location.state;
  const { country } = props.location.state;
  const [newReply, setNewReply] = useState('');
  const [replyList, setReplyLIst] = useState('');

	const addReply = (e) => {
			e.preventdefault();
			if(!newReply) {
					return alert ("Type your reply!");
			}
	}

	useEffect(() => {

		firebase.database().ref().child(`postlist`).child(`seoul`).child(`${post.key}`).child('comment').on('value', function(snapshot) {
			setCommentArray(commentArray=>[]);			
			Object.values(snapshot.val()).map(comment => (setCommentArray(commentArray => [...commentArray, comment])));
		});
	  }, []);

	console.log(commentArray);

  const addComment = (e) =>{
		e.preventDefault();
		firebase.database().ref().child(`postlist`).child(`seoul`).child(`${post.key}`).child('comment').update({ [Date(Date.now()).toString()] : `${newReply}` });
		document.getElementById('comment-form').reset();
	}

  const like = () => {
		firebase.database().ref().child(`postlist`).child(`seoul`).child(`${post.key}`).on("value", function(childSnap){
			firebase.database().ref().child(`postlist`).child(`seoul`).child(`${post.key}`).update({ like: childSnap.val().like =+ 1});
      console.log(childSnap.val().like);
		})

		document.getElementById('like-button').disabled = true;

	}

  const follow = () => {
		firebase.database().ref().child(`users`).child(`${userUid}`).child(`follows`).update({ email: `${post.useremail}`});
	}

	useEffect(() => {
		firebase.database().ref().child(`users`).child(`${userUid}`).child(`follows`).update({ email: `${post.useremail}`});
	})

	return(
    <React.Fragment>
			<main style={{align: 'center'}}>
  			<Container maxWidth={false} className={classes.postHeader}>
  				<Typography component="h1" variant="h5" align="left" color="textPrimary">
  					{country} 여행 게시판
  				</Typography>
  			</Container>
  			<Container className={classes.card}>
  				<Card>
  					<CardHeader
  						align = 'center'
  						title = {post.title}
  						subheader={`작성자: ${post.useremail} | 작성시간: ${moment.unix(post.date / 1000).format('YYYY년 MM월 DD일 HH:mm')}`}
  					/>
  					<CardMedia
  						className = {classes.media}
  						image = "https://image.freepik.com/free-photo/beautiful-architecture-building-cityscape-seoul-city_74190-3218.jpg"
  						title = "Seoul"
  					/>
  					<CardContent align = 'right'>
  						<ButtonGroup >
<<<<<<< HEAD
  							<Button id="like-button" onClick={()=>like()}>Like</Button>
=======
  							<Button onClick={()=>like()} id="like-button" >Like</Button>
>>>>>>> c5586ca3fea15f1a834f2ad94aaa8255b25e5773
  							<Button onClick={()=>follow()}>Follow</Button>
  						</ButtonGroup>
  					</CardContent>
  					<Divider light/>
  					<CardContent align = 'left'>
  							<pre>{post.text}</pre>
  					</CardContent>
  					<Divider light/>
  				</Card>
  			</Container>
  			<Container className={classes.reply}>
  				<h4>댓글</h4>
  				<Paper id="comment-field">
					{
					commentArray.map(comment=>(
						<div><span>{comment}</span></div>					
						)
					 )	
					}
  				</Paper>
  				<Divider/>
  			</Container>
  			<Container>
  					<form id="comment-form" align = 'center'>
  							<p><TextField id="commentTextfield" type = "text" placeholder = "댓글을 남겨주세요." onChange={(e) => setNewReply(e.target.value)} style={{width:'85%'}}/>
  							{'   '}
<<<<<<< HEAD
  							<Button type="submit" onClick={(e)=>addComment(e)} variant="contained" color="primary" endIcon={<AddCommentIcon/>}>Add</Button>
=======
  							<Button onClick={(e)=>addComment(e)} type = "submit" variant="contained" color="primary" endIcon={<AddCommentIcon/>}>Add</Button>
>>>>>>> c5586ca3fea15f1a834f2ad94aaa8255b25e5773
  							</p>
  					</form>
  			</Container>
			</main>
		</React.Fragment>
	)
}

export default withStyles(styles)(ViewPost);
