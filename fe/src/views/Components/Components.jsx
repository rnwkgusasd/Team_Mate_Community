import React from "react";
import axios from 'axios';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
import InfiniteScroll from "react-infinite-scroll-component";

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import ChatButton from "views/Components/Sections/ChatButton"
//import { Card } from "@material-ui/core";
import AddDialog from "components/Header/AddNoteDialog.js";

class Components extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      LoggedName:"",
      isLoggedIn:false,
      items: [],
      items_end: 3,
      hasMore: true,
      desc:[],
      change:true
    };
  }
  checkLike = false;
  state1 = <FavoriteBorder />;
  fetchMoreData = () => {
    if (this.state.items.length >= this.state.desc.length) {
      this.setState({ hasMore: false });
      return;
    }
    setTimeout(() => {
      for(let i=this.state.items_end; i<this.state.items_end+3; i++){
        if(this.state.desc[i]){
          this.state.items.push(this.state.desc[i])
          this.forceUpdate();
        }
      }
      this.setState({items_end:this.state.items_end+3})
    }, 700);
  };

  ChangeLike = () => {
    if(this.checkLike) {
      this.checkLike = false;
      this.state1=<FavoriteBorder />;
      this.forceUpdate()
    }
    else {
      this.checkLike = true;
      this.state1=<Favorite />;
      this.forceUpdate()
    }
  }
  setlogedin=()=>{
    this.state.isLoggedIn=localStorage.getItem('logedin')?true:false
    this.state.LoggedName=localStorage.getItem('logedin')
  }
  updateState(){
    this.state.change=true
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/comm')
      .then((r) => {
        this.setState({desc:r.data.commDoc.reverse()})
        for(let i=0; i<this.state.desc.length; i++){
          localStorage.setItem('desc_'+i,this.state.desc[i]._id)
        }
        if(this.state.desc.length==0) this.setState({hasMore:false})
        for(let i=0; i<this.state.items_end; i++){
          if(this.state.desc[i]){
            this.state.items.push(this.state.desc[i])
            this.forceUpdate();
          }
        }
      })
      .catch((e) => {
        console.error(e.message)
      })  
      this.state.change=false
      this.forceUpdate();
  }

  render() {
    const { classes, ...rest } = this.props;
    const cardStyle = {width:"60rem", height:"30rem", margin:"5rem"};
    const LikeButton = this.state1;
    this.setlogedin();    
    const logedin_header=(
      <Header
          brand="GSM ASSEMBLE"
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          LoggedName={this.state.LoggedName}
          isLoggedIn={true}
          {...rest}
        />
    )
    const logedout_header=(
      <Header
          brand="GSM ASSEMBLE"
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          isLoggedIn={false}
          {...rest}
        />
    )

    return (
      <div>
        {this.state.isLoggedIn ? logedin_header : logedout_header}
        <Parallax image={require("assets/img/bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>GSM ASSEMBLE</h1>
                  <h3 className={classes.subtitle}>
                    Let's make team for the competition.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center" direction="column">
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <h4 style={{ textAlign: "center" }}>- End -</h4>
                </p>
              }
            >
              {this.state.items.map((i, index) => (
              <GridItem>
                <Card style={cardStyle}>
                  <CardHeader color="danger" style={{display: 'flex'}}>
                    <p style={{fontSize:"17px",marginTop:"12px", marginRight:"725px", marginLeft:"12px"}}>작성자:&nbsp;{i.writer}</p>
                    <CustomDropdown
                      id={index}
                      dropdownList={[
                        "Edit",
                        {divider: true},
                        "Remove"
                      ]} 
                      buttonProps={{
                        round: true,
                        justIcon: true,
                        simple: true
                      }}                    
                    />
                  </CardHeader>
                  <CardBody style={{margin:"20px"}}>
                    <div>{i.desc}</div>
                  </CardBody>
                  <CardFooter>
                    <Button justIcon round color="rose" onClick={() => {this.ChangeLike()}}>
                      {LikeButton}
                    </Button>
                    <ChatButton />
                  </CardFooter>
                </Card>
              </GridItem>))}
              </InfiniteScroll>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

Components.propTypes = {
  classes: PropTypes.object
};

export default withStyles(componentsStyle)(Components);