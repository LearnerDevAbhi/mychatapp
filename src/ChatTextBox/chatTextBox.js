import React, { Component } from 'react';
import Styles from "./styles";
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


class chatBoxComponent extends Component {
    constructor() {
        super();
        this.state = {
            chatText: ''

        }

    }
    render() {
        const { classes } = this.props;
        return (<div className={classes.chatBoxContainer}>
            <TextField
                onKeyUp={(e) => this.userTyping(e)}
                placeholder='Type your message.....'
                id='chattextbox'
                fullWidth className={classes.textField}></TextField>
            <SendIcon className={classes.sendBtn} onClick={this.submitMessage}></SendIcon>

        </div>)
    }
    userTyping = (e) => e.keyCode === 13 ? this.submitMessage():this.setState({chatText: e.target.value});
    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById('chattextbox').value='';
            console.log('it iss working ')
        }
    }
}
export default withStyles(Styles)(chatBoxComponent);