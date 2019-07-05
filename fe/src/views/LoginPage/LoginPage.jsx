import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Router, Route, Switch } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Link } from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { browserHistory } from 'react-router';
import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      userID: "",
      password: "",
      allUsers:[]
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="GSM ASSEMBLE"
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="ID"
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name:"userID",
                          type: "text",
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        name="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "password",
                          type: "password",
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Link to={"/find-page"} className={classes.link}>
                        <Button simple color="rose" size="sm">
                          Forgot password?
                        </Button>
                      </Link>
                    </CardFooter>
                    <CardFooter className={classes.cardFooter}>
                    <Button round color="primary" size="lg" onClick={this.handleLogin}>
                        Login
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
  handleLogin(){
    axios.get('http://localhost:8080/api/signup')
    .then((r) => {
      let selectUser = null
      this.setState({ allUsers: r.data.users});
      this.state.allUsers.forEach(user =>{
        if(user.userID === this.state.userID){
          selectUser = user
          this.setState({ username: user.name});
        }
      })
      if (selectUser === null) alert('입력하신 이메일이 없습니다')
      else{
        if(selectUser.userPW !== this.state.password)
          alert('비밀번호가 일치하지 않습니다.')
        else{
          console.log("dd",this.state.username);  
          alert('로그인 완료')
          localStorage.clear();
          localStorage.setItem('logedin',this.state.username)
          localStorage.setItem('id',this.state.userID)
          console.log(this.props.isLoggedIn)
          this.props.history.push('/');
        }
      }
    })
    .catch((e) => {
      console.error(e.message)
    })
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);