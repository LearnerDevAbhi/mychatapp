import React, { Component } from "react";
import ChatListComponent from "../chatList/chatList";
import ChatBoxComponent from "../ChatTextBox/chatTextBox";
import NewChatComponent from "../NewChat/newChat";
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Styles from "./styles";
import Chatview from "../chatView/chatview";

const firebase = require('firebase');


class dashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        }
    }
    render() {
        const {classes}=this.props;
        return (<>
            <div style={{width:'100%'}}>
                <div style={{float:"left",width:'25%'}}>
            <ChatListComponent 
            newChatBtnFn={this.newchatBtnClicked}
            selectChatFn={this.selectChat}
            chats={this.state.chats}
            userEmail={this.state.email}
            selectedChatIndex={this.state.selectedChat}
                       ></ChatListComponent>
             
            <Button onClick={this.signOut} variant='contained' className={classes.signOutbtn} fullWidth='true' color='secondary'>signOut</Button>
            </div>
            <div style={{float:"left",width:'75%'}}>
             {
                this.state.newChatFormVisible?null:<Chatview
                 user={this.state.email}
                 chat={this.state.chats[this.state.selectedChat]}/>

                 
            }
            {
                this.state.selectedChat !== null && !this.state.newChatFormVisible?
                <ChatBoxComponent
                submitMessageFn={this.submitMessage}
                ></ChatBoxComponent>:null

            }
           {
               this.state.newChatFormVisible?<NewChatComponent goToChatFn={this.gotoChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent>:null
           }

            </div>
            
            </div>
        </>)
    } // render ends here
    newChatSubmit=async(chatObj)=>{
     const docKey=this.buildDocKey(chatObj.sendTo);
     await firebase
     .firestore()
     .collection('chats')
     .doc(docKey)
     .set({
         messages:[{
             message:chatObj.message,
             sender:this.state.email
        }],
        users:[this.state.email,chatObj.sendTo],
        recieverHasRead:false
     });
     this.setState({newChatFormVisible:false});
    this.selectChat(this.state.chats.length-1);
     }
    gotoChat=async (docKey,msg)=>{
        const userInChat=docKey.split(':');
        const chat=this.state.chats.find(_chat=>userInChat.every(_user=>_chat.users.includes(_user)));
        this.setState({newChatFormVisible:false});
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);

    }

    submitMessage=(msg)=>{
      const docKey=this.buildDocKey(this.state.chats[this.state.selectedChat]
        .users
        .filter(_usr=>_usr!==this.state.email)[0])
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({
            messages:firebase.firestore.FieldValue.arrayUnion({
                sender:this.state.email,
                message:msg,
                timestamp:Date.now()
            }),
            recieverHasRead:false
        });

    }
    buildDocKey=(friend)=>[this.state.email,friend].sort().join(':');
    signOut=()=>firebase.auth().signOut();
    selectChat = async (chatIndex) => {
   await this.setState({selectedChat:chatIndex,newChatFormVisible:false}) ;
   this.messageRead();
    }
    newchatBtnClicked = () => this.setState({newChatFormVisible:true,selectedChat:null});
    clickedChatWhereNotSender=(chatIndex)=>this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length-1].sender!== this.state.email;
    
    messageRead=()=>{
        const docKey=this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr=>_usr!==this.state.email)[0]);
      if(this.clickedChatWhereNotSender(this.state.selectedChat)){
          firebase
          .firestore()
          .collection('chats')
          .doc(docKey)
          .update({recieverHasRead:true});
      }else{
          console.log('user was the sender');
      }
    }
    componentDidMount=()=>{
        firebase.auth().onAuthStateChanged(async _usr=>{
            if(!_usr){
                this.props.history.push('/login')
            }
            else{
                await firebase
                .firestore()
                .collection('chats')
                .where('users','array-contains',_usr.email)
                .onSnapshot(async res=>
                    {
                    const chats=res.docs.map(_doc=>_doc.data());
                    await this.setState({
                        email:_usr.email,
                        chats:chats
                    });
                    console.log(this.state);
                    
                })
            }
        } )
    }
    newChatBtnClicked=()=>this.setState({newChatFormVisible:true,selectedChat:null});

}
export default withStyles(Styles)(dashboardComponent);