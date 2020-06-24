import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

import { ListItem, Button, List,ListItemText, CssBaseline, Typography, ListItemAvatar, Avatar, Divider, ListItemIcon } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

import Styles from "./styles";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const firebase = require('firebase');

class chatListComponent extends Component {
    render() {
        const { classes } = this.props;
        if (this.props.chats.length > 0) {
            return (< div className={classes.root}>
                <CssBaseline>
                    <Button variant='contained' fullWidth color='primary' onClick={this.newChat} className={classes.newchtabtn} >
                        NewMessage
                </Button>
                    <List>
                        {
                            this.props.chats.map((_chat, _index) => {
                                return (
                                    < div key={_index}>
                                        <ListItem onClick={() => this.selectChat(_index)}
                                            className={classes.listItem}
                                            selected={this.props.selectedChatIndex === _index}
                                            alignItems="flex-start"
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt='remy sharp'>{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                                                secondary={
                                                    <Fragment>
                                                        <Typography component='span' color='primary'>
                                                            {
                                                                _chat.messages[_chat.messages.length - 1].message.substring(0, 30)+ ' ...'
                                                            }
                                                        </Typography>
                                                    </Fragment>

                                                }>

                                            </ListItemText>
                                                  {

                                                      _chat.recieverHasRead===false&& !this.userIsSender(_chat)?
                                                      <ListItemIcon><NotificationImportant className={classes.notification}></NotificationImportant></ListItemIcon>:null
                                                  }
                                        </ListItem>
                                        <Divider></Divider>
                                    </ div>
                                )
                            })
                        }
                    </List>
                </CssBaseline>
            </ div>)
        } else{
            return(<main className={classes.root}>
                <Button variant='contained'
                fullWidth
                onClick={this.newChat}
                className={classes.newchtabtn}
                >
                    New Message
                </Button>
                <List></List>
                </main>
            )
            }
    }
    newChat = () => {
             this.props.newChatBtnFn();
             console.log('you clicked on newchat')
    }
    selectChat = (index) => {
        console.log('selected chat', index);
        this.props.selectChatFn(index);
    }
    userIsSender=(chat)=>chat.messages[chat.messages.length-1].sender===this.props.userEmail
}
export default withStyles(Styles)(chatListComponent);