import React, { Component, Fragment } from "react";

import Styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { Container, Button, Grid, Typography, Paper, Input, FormControl, InputLabel, CssBaseline } from "@material-ui/core";


class chatViewcomponent extends Component{

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if(container)
          container.scrollTo(0, container.scrollHeight);
      }
    render(){
        const {classes,chat,user}=this.props;
        if(chat===undefined){
      return(<main className={classes.content} ></main>)
        }else if(chat !== undefined){
          return(<div style={{width:'100%'}}>
              <div className={classes.chatHeader} >
           <Typography variant='h5'>  Your conversation with<b>  {chat.users.filter(_usr=>(_usr!==user))[0]}</b></Typography>
           </div>
             
             <main id='chatview-container' className={classes.content}>
             
           <div >
            {
            chat.messages.map((_msg,_index)=>{
                return(
                    <div key={_index} className={_msg.sender === user?classes.userSent:classes.friendSent}>
                        {
                            _msg.message
                        }
                    </div>
                )
            })
        }
</div>
          </main>
             
          
          </div>)
        } else{
            return (<div className='chatview-container'>Loading...</div>);

        }
        
    }
}
 export default withStyles(Styles)(chatViewcomponent)