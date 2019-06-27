import React from "react";
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

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';


import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import ChatButton from "views/Components/Sections/ChatButton"
//import { Card } from "@material-ui/core";

class Components extends React.Component {

  state = <FavoriteBorder />;
  checkLike = false;

  ChangeLike = () => {
    if(this.checkLike) {
      this.checkLike = false;
      this.setState(<FavoriteBorder />);
    }
    else {
      this.checkLike = true;
      this.setState(<Favorite />);
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const cardStyle = {width:"60rem", height:"30rem", margin:"5rem"};
    const LikeButton = this.state;

    return (
      <div>
        <Header
          brand="GSM ASSEMBLE"
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
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
              <GridItem>
                <Card style={cardStyle}>
                  <CardHeader color="danger" style={{textAlign:"right"}}>
                    <CustomDropdown
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
                    <p>이 곳에 작성할 내용이 써진다.</p>
                  </CardBody>
                  <CardFooter>
                    <Button justIcon round color="rose" onClick={() => {this.ChangeLike()}}>
                      {LikeButton}
                    </Button>
                    <ChatButton />
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem>
                <Card style={cardStyle}>
                  <CardHeader color="danger" style={{textAlign:"right"}}>
                    <CustomDropdown
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
                    <p>이 곳에 작성할 내용이 써진다.</p>
                  </CardBody>
                  <CardFooter>
                    <Button justIcon round color="rose" onClick={() => {this.ChangeLike()}}>
                      {LikeButton}
                    </Button>
                    <ChatButton />
                  </CardFooter>
                </Card>
              </GridItem>
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
