import React, { Component } from 'react';
import Styles from "./styles";
import { FormControl, InputLabel, Input, Button, Paper, CssBaseline, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
const firebase = require("firebase");


class NewChatComponent extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            message: null
        }
    }

    render() {
        const { classes } = this.props;
        return (<>
            <CssBaseline>
                <Paper>

                    <Typography component="h1" variant="h5">Send A Message!</Typography>
                    <form className={classes.Form} onSubmit={(e)=>this.submitNewChat(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-username'>
                                Enter Your Friend's Email
                            </InputLabel>
                            <Input id='new-chat-username' type='email'className={classes.Input} onChange={(e) => this.userTyping('username', e)} autoFocus required></Input>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-message'>
                                Type Your Message
                            </InputLabel>
                            <Input id='new-chat-message' className={classes.Input} onChange={(e) => this.userTyping('message', e)} autoFocus required></Input>
                        </FormControl>
                        <Button type='submit'  variant='contained' className={classes.Button} fullWidth>Send Message</Button>

                    </form>
                </Paper>
            </CssBaseline>
        </>)
    }
    
    //render ends here

    userTyping=(inputType,e)=>{
        switch (inputType) {
            case 'username':
                this.setState({username:e.target.value})
                break;
                case 'message':
                this.setState({message:e.target.value})
                    break;
            
            default:
                break;
        }
    }
    submitNewChat= async (e)=>{
     e.preventDefault();
     const userExists=await this.userExists();
     if(userExists){
         const chatExists=await this.chatExists();
         chatExists?this.goToChat():this.createChat();
     }
     alert('new chat is working')
    }
    goToChat=()=>{
        this.props.goToChatFn(this.buildDocKey(),this.state.message);
    }
   createChat=()=>{
       this.props.newChatSubmitFn({
           sendTo:this.state.username,
           message:this.state.message
       })
       console.log('create chat is also working')
   }
    chatExists= async ()=>{
        const docKey=this.buildDocKey();
        const chat= await firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .get();
        console.log(chat.exists,'hare ram hare krishna');
        return chat.exists;

    }
    buildDocKey=()=>[firebase.auth().currentUser.email,this.state.username].sort().join(':');
    userExists=async ()=>{
        const usersSnapshot=await firebase
        .firestore()
        .collection('users')
        .get();
        const exists=usersSnapshot.docs.map(_doc=>_doc.data().email).includes(this.state.username);
        this.setState({serverError:!exists});

        return exists;
    }
}
export default withStyles(Styles)(NewChatComponent);