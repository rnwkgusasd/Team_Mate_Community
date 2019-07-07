import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Chat from '@material-ui/icons/Chat';
import Face from '@material-ui/icons/Face';

import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function Save(){
    const text=document.getElementById("regular").value
    const name=localStorage.getItem("logedin")
    const id=localStorage.getItem("id")
    axios.post('http://localhost:8080/api/rpl',{
      docNum:/*이부분에 값이 넘어와야됨*/0, writerid:id, writername:name, desc:text, rplNum:0})
    .then((r) => {
    })
    .catch((e) => {
      console.error(e.message)
    })
    alert("추가 완료")
    setOpen(false);
    window.location.reload();
  }

  return (
    <div>
      <Button justIcon round color="info" onClick={handleClickOpen}>
        <Chat className={classes.Icon} />
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Face style={{margin:"20px"}} />
            <ListItemText primary="댓글의 내용이 입력됩니다." secondary="3201 구자현" />
          </ListItem>
          <Divider />
          <ListItem>
            <Face style={{margin:"20px"}} />
            <ListItemText primary="댓글의 내용이 입력됩니다." secondary="3204 김민규" />
            <CustomDropdown
              dropdownList={[
                "Edit",
                {divider: true},
                "Remove"
              ]}
              buttonProps={{
                round: true,
                justIcon: true,
                color: "gray"
              }}
            />
          </ListItem>
          <Divider />
        </List>
        <GridContainer justify="center">
          <GridItem xs={6}>
            <CustomInput id="regular"
            inputProps={{placeholder: "Writing your comments"}}
            formControlProps={{ fullWidth: true }} />
          </GridItem>
          <GridItem xs={1}>
            <Button color="info">입력</Button>
          </GridItem>
        </GridContainer>
      </Dialog>
    </div>
  );
}