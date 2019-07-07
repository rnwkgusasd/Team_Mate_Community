import React from "react";
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import Dialog from '@material-ui/core/Dialog';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Popper from "@material-ui/core/Popper";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// core components
import Button from "components/CustomButtons/Button.jsx";
import Button2 from '@material-ui/core/Button';

import customDropdownStyle from "assets/jss/material-kit-react/components/customDropdownStyle.jsx";
import AddDialog from "components/Header/AddNoteDialog.js";

class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id:0,
      editdialog:false,
      editword:[""]
    };
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClose = param => {
    this.setState({ open: false });
    if (this.props && this.props.onClick) {
      this.props.onClick(param);
    }
  };
  editclose = () =>{
    this.setState({editdialog:false})
  }
  modify = () =>{
    this.state.id=localStorage.getItem('desc_'+this.props.id)
    const text=document.getElementById("dectext1").value
    axios.put(`http://localhost:8080/api/comm/${this.state.id}`,{
      title:"", desc:text, writerid:localStorage.getItem("id"), writer:localStorage.getItem("logedin"), docNum:0, viewCnt:0, likeCnt:0
    })
    .then((r) => {
      alert("수정 성공")
      this.setState({editdialog:false})
      window.location.reload()
    })
    .catch((e) => {
      console.error(e.message)
    })
  }
  desctask = taskname=>{
    if(taskname=="Edit"){
      this.state.id=localStorage.getItem('desc_'+this.props.id)
      this.setState({editdialog:true})
      axios.get('http://localhost:8080/api/comm/')
      .then((r) => {
        r.data.commDoc.forEach(i=>{
          if(i._id==this.state.id){
            this.setState({editword:i.desc})
          }
        })
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
    if(taskname=="Remove"){
      this.state.id=localStorage.getItem('desc_'+this.props.id)
      console.log(this.state.id,"dd")
      axios.delete(`http://localhost:8080/api/comm/${this.state.id}`)
        .then((r) => {
          alert("삭제 성공")
          window.location.reload()
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
  handleCloseAway = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    const {
      classes,
      buttonText,
      buttonIcon,
      dropdownList,
      buttonProps,
      dropup,
      dropdownHeader,
      caret,
      hoverColor,
      left,
      rtlActive,
      noLiPadding
    } = this.props;
    const caretClasses = classNames({
      [classes.caret]: true,
      [classes.caretActive]: open,
      [classes.caretRTL]: rtlActive
    });
    const dropdownItem = classNames({
      [classes.dropdownItem]: true,
      [classes[hoverColor + "Hover"]]: true,
      [classes.noLiPadding]: noLiPadding,
      [classes.dropdownItemRTL]: rtlActive
    });
    let icon = null;
    switch (typeof buttonIcon) {
      case "object":
        icon = <this.props.buttonIcon className={classes.buttonIcon} />;
        break;
      case "string":
        icon = (
          <Icon className={classes.buttonIcon}>{this.props.buttonIcon}</Icon>
        );
        break;
      default:
        icon = null;
        break;
    }
    return (
      <div>
        <Dialog open={this.state.editdialog} onClose={this.editclose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Writting</DialogTitle>
          <DialogContent style={{width:"35rem", height:"50rem"}}>
            <div>
              <InputGroup>
                <FormControl multiple id="dectext1" as="textarea" defaultValue={this.state.editword} aria-label="With textarea" rows="30" placeholder="Enter Here..." />
              </InputGroup>
            </div>
          </DialogContent>
          <DialogActions>
            <Button2 onClick={this.editclose} >
              Cancel
            </Button2 >
            <Button2 onClick={this.modify}>
              Modify
            </Button2>
          </DialogActions>
        </Dialog>
        <div>
          <Button
            aria-label="Notifications"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            {...buttonProps}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            onClick={this.handleClick}
          >
            {icon}
            {buttonText !== undefined ? buttonText : null}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </div>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement={
            dropup
              ? left
                ? "top-start"
                : "top"
              : left
              ? "bottom-start"
              : "bottom"
          }
          className={classNames({
            [classes.popperClose]: !open,
            [classes.popperResponsive]: true
          })}
        >
          {() => (
            <Grow
              in={open}
              id="menu-list"
              style={
                dropup
                  ? { transformOrigin: "0 100% 0" }
                  : { transformOrigin: "0 0 0" }
              }
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={this.handleCloseAway}>
                  <MenuList role="menu" className={classes.menuList}>
                    {dropdownHeader !== undefined ? (
                      <MenuItem
                        onClick={() => this.handleClose(dropdownHeader)}
                        className={classes.dropdownHeader}
                      >
                        {dropdownHeader}
                      </MenuItem>
                    ) : null}
                    {dropdownList.map((prop, key) => {
                      if (prop.divider) {
                        return (
                          <Divider
                            key={key}
                            onClick={() => this.handleClose("divider")}
                            className={classes.dropdownDividerItem}
                          />
                        );
                      }
                      return (
                        <MenuItem
                          key={key}
                          onClick={(r) => this.desctask(r.nativeEvent.target.outerText)}
                          className={dropdownItem}
                        >
                          {prop}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: "gray"
};

CustomDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  hoverColor: PropTypes.oneOf([
    "black",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  noLiPadding: PropTypes.bool,
  // function that retuns the selected item
  onClick: PropTypes.func
};

export default withStyles(customDropdownStyle)(CustomDropdown);
