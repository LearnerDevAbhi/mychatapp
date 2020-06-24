import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Container, Button, Grid, Typography, Paper, Input, FormControl, InputLabel, CssBaseline } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Styles from "./styles";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const firebase = require('firebase');

class loginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            serverError: false

        }
    }

    render() {
        const { classes } = this.props;
        return (<>
            <CssBaseline>
                <Container>
                    <center>
                        <Paper className={classes.paper}>
                            <form className={classes.formStyle} onSubmit={(e)=>this.submitForm(e)}>
                                <Typography variant='h4' style={{ color: '#101dad', fontWeight: 'bold', fontStyle: 'georgia' }}><VpnKeyIcon></VpnKeyIcon>    Login Here!</Typography>
                                <FormControl require='true' fullWidth margin='normal' className={classes.uplabel}>
                                    <InputLabel htmlFor='loginmail' className={classes.uplabel}>Type Your Email</InputLabel>
                                    <Input id='loginmail' type='email' onChange={(e) => this.userTyping('email', e)}></Input>

                                </FormControl>
                                <FormControl require='true' fullWidth margin='normal' className={classes.lowlabel} >
                                    <InputLabel htmlFor='loginpassword' className={classes.lowlabel}>Type Your Password</InputLabel>
                                    <Input type='password' id='loginpassword' onChange={(e) => this.userTyping('password', e)}></Input>
                                </FormControl>
                                <Button variant='contained' color='secondary'type='submit' style={{ width: 400, marginRight: 25, marginBottom: 5, marginLeft: 25 }}>Login</Button>
                            </form>
                            { 
                            this.state.serverError ?
                            <Typography variant='h5' style={{color:'red'}}>Incorrect Id or Password</Typography>
                            :null

                            }
                            <h5 className={classes.noAccountHeader}>Don't Have An Account? &nbsp;
                       <Link className={classes.signUpLink} to='/signup'>Sign Up!</Link></h5>

                        </Paper>
                    </center>
                </Container>
            </CssBaseline>
        </>)
    }//render finish
    userTyping = (value, e) => {
        switch (value) {
            case 'email':
                this.setState({ email: e.target.value })
                break;
            case 'password':
                this.setState({ password: e.target.value })
                break;
            default:
                break;
        }
    } // userTyping finish
 submitForm= async (e)=>{
     e.preventDefault();
    await firebase
     .auth()
     .signInWithEmailAndPassword(this.state.email,this.state.password)
     .then(()=>{this.props.history.push('/dashboard')}
     ,err=>{this.setState({serverError:true})})
 }
}
export default withStyles(Styles)(loginComponent);