import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Button, Grid, Typography, Paper, Input, FormControl, InputLabel, CssBaseline } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Styles from "./styles";

const firebase = require('firebase');

class signupComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            signupError: ''

        }
    }


    render() {
        const { classes } = this.props;
        return (<>
            <CssBaseline>
                <Container>
                    <center>
                        <Paper className={classes.paper}>
                            <form className={classes.formStyle} onSubmit={(e) => this.submitGroup(e)}>
                                <Typography variant='h4' style={{ color: '#9c27b0', fontWeight: 'bold', fontFamily: 'georgia', border: '5px solid #9c27b0' }}>Please Signup</Typography>
                                <FormControl required fullWidth margin='normal' className={classes.uplabel}>
                                    <InputLabel htmlFor='forEmail' className={classes.uplabel}>Type Your Email</InputLabel>
                                    <Input id='forEmail' type='email' onChange={(e) => this.userTyping('email', e)} > </Input>
                                </FormControl>
                                <FormControl required fullWidth margin='normal' className={classes.lowlable}>
                                    <InputLabel htmlFor='forPass' className={classes.lowlable}>Type Your Password</InputLabel>
                                    <Input id='forPass' type='password' onChange={(e) => this.userTyping('password', e)} > </Input>
                                </FormControl>
                                <FormControl required fullWidth margin='normal' className={classes.lowlable}>
                                    <InputLabel htmlFor='forRePass' className={classes.lowlable}>Confirm Your Password</InputLabel>
                                    <Input id='forRePass' type='password' onChange={(e) => this.userTyping('repassword', e)} > </Input>
                                </FormControl>
                                <Button variant='contained' color='secondary' type='submit' style={{ marginBottom: 10, marginTop: 10 }}>Signup</Button>
                            </form>
                            {
                                this.state.signupError ? <Typography varinat='h6'>{this.state.signupError}</Typography> : null
                            }
                            <h5 className={classes.hasAccountHeader}>Already Have An Account? <Link className={classes.logInLink} to='/login'>Log In!</Link></h5>

                        </Paper>
                    </center>

                </Container>
            </CssBaseline>

        </>)
    }
    // Now starts script
    userTyping = (data, e) => {
        switch (data) {
            case 'email':
                this.setState({ email: e.target.value })
                break;
            case 'password':
                this.setState({ password: e.target.value })
                break;
            case 'repassword':
                this.setState({ repassword: e.target.value })
                break;
            default:
                console.log('Nothing is here')
                break;
        }
    }
    formIsValid = () => this.state.password === this.state.repassword  // for confirmation of user password
    submitGroup = (e) => {            //it opens here
        e.preventDefault();
        if (!this.formIsValid()) {
            this.setState({ signupError: 'password did not match' })
            return;

        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(authres=>{
            const userObj={
                email:authres.user.email
            };
            firebase.firestore()    // to storing the users into database   
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(()=>{this.props.history.push('/dashboard')})
            .catch(dbErr=>{
                console.log(dbErr);
                this.setState({signupError:'Failed to add user'})
            })
        }).catch(authErr=>{
            console.log(authErr);
            this.setState({signupError:'Failed to add user'})
        })
    }   // ends here


}
export default withStyles(Styles)(signupComponent);