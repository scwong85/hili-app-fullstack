import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleQuote } from "../../services/data.services";
import { getTokenUser } from "../../services/user.services";
import * as action from '../../store/actions/auth';
import { connect } from "react-redux";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import { red, yellow, blue, green, purple } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from "@mui/material";

import { deleteSingleQuote, saveSingleQuote, getQuotesTags, saveQuotesTags, patchQuotesTags } from "../../services/data.services";

import { Chip } from "@mui/material";
import { Stack } from "@mui/material";

function QuoteView(props) {

  const { qid } = useParams();
  const token = window.localStorage.getItem('token');
  const [data, setData] = useState({});

  const [user, setUser] = useState('');
  const [save, setSave] = useState(false)
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();

  const [selectedTag, setSelectedTag] = React.useState('');
  const [quoteNotes, setQuoteNotes] = React.useState('');
  const [userTags, setUserTags] = useState(data.user_tags); // user defined tags in each quote
  const [stateTag, setStateTag] = useState(''); // curent tag inserted in the text box
  const [allTags, setAllTags] = useState('') // all tags in all quotes
  const [allTagsId, setAllTagsId] = useState(0);


  const generateUserTags = () => {
    return (
      <Stack direction="row" spacing={1}>
        {
          data.user_tags !== undefined ?
          data.user_tags.split(',').map((tag, index) => {
            if (tag.length > 0) {
              return (<Chip key={index} label={tag} variant="outlined" onDelete={()=>handleDeleteTag(tag)} />)
            }
            
          })
          : <></>
        }
      </Stack>
    )
  }

  const handleChange = (event) => {
    setSelectedTag(event.target.value);
    let tmpData = data
    tmpData.tag = event.target.value;
    setData(tmpData);
  };

  const handleNoteChange = (event) => {
    setQuoteNotes(event.target.value);
    let tmpData = data
    tmpData.notes = event.target.value;
    setData(tmpData);
  };

  const handleTagChange = (event) => {
    setStateTag(event.target.value);
  };

  const addTagToState = () => {
    let tmp = ''
    if (userTags !== undefined) {
      let tmpUserTag = userTags.split(',')
      if (tmpUserTag.includes(stateTag) === false) {
        tmpUserTag.push(stateTag)
        tmp = tmpUserTag.toString()
        setUserTags(tmp)
      } else {
        tmp = tmpUserTag.toString()
        console.log('already have')
      }
    } else {
      tmp = stateTag
      setUserTags(stateTag)
    }
    let tmpData = data
    tmpData.user_tags = tmp
    setData(tmpData);
    console.log('tmpData', tmpData)

    tmp = ''
    if (allTags !== undefined) {
      let tmpUserTag = allTags.split(',')
      if (tmpUserTag.includes(stateTag) === false) {
        tmpUserTag.push(stateTag)
        tmp = tmpUserTag.toString()
        setAllTags(tmp)
      }
    } else {
      tmp = stateTag
      setAllTags(stateTag)
    }

  } 

  const handleSave = (event) => {
    console.log(data);
    saveSingleQuote(qid, data)
      .then(res => {
        if (res.status === 200) {
          console.log('save!')
          setSave(true);
        }
      })
      .catch(err => {
        console.log('error saving', err)
      })

      if (allTagsId !== 0) {
        patchQuotesTags(allTagsId, {'quote_tags': allTags})
      } else {
        saveQuotesTags({'quote_tags': allTags})
      }
  }

  const handleOpenDialog = (event) => {
    setOpenDialog(true);
  }

  const handleCloseDialog = (event) => {
    setOpenDialog(false);
  }

  const handleDelete = (event) => {
    deleteSingleQuote(qid)
      .then(res => {
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleDeleteTag = (label) => {
    console.log(label);
    if (userTags !== undefined) {
      let tmpUserTags = userTags.split(',')
      let tmp = tmpUserTags.filter((a) => a!==label).toString()
      setUserTags(tmp)
      let tmpData = data
      tmpData.user_tags = tmp
      setData(tmpData);
      console.log(tmpData)
    }
  }

  const controlProps = (item) => ({
    checked: selectedTag === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  useEffect(() => {
    console.log('try to sign up')
    props.onTryAutoSignup();
    
  }, [])


  useEffect(() => {
    if (!props.isAuthenticated) {
        navigate('/login/');
    } else if (props.isAuthenticated) {
        console.log('try to get quotes')
        let token_data = getTokenUser(token)
        setUser(token_data['username']);
        getSingleQuote(qid)
        .then(res => {
          setData(res.data);
          setSelectedTag(res.data.tag);
          setUserTags(res.data.user_tags)
          
        })
        .catch(err => {
          console.log(err);
        })

        getQuotesTags()
        .then(res=> {
          console.log('res', res.data)
          if(res.data.length === 1) {
            console.log('all tags', res.data[0].quote_tags)
            setAllTags(res.data[0].quote_tags)
            setAllTagsId(res.data[0].id)
          } else if(res.data.length > 1) {
            console.log('admin quote tags', res.data)
            
          }
        })
    }
  }, [props.isAuthenticated])

  const saveSuccess = () => {
    //setSave(false);
    return (
      <Alert severity="success">Modification save!</Alert>
    )
  }
  

  return (
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
        }}
    >
        <Typography variant="h6">
          Quote Details
        </Typography>
        { save ? saveSuccess() : <></> }
        <Box component="form" noValidate sx={{ mt: 3, width: '100%' }} xs={12} sm={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12}>
              
              <Typography>{data.quote}</Typography>
            </Grid> 
            <Grid item xs={12} sm={12} lg={12}>
              { generateUserTags() }
            </Grid>
            <Grid item >
              <TextField onChange={handleTagChange} />
              <Button variant="contained" sx={{ alignItems:'center', m:1 }} onClick={addTagToState}>Add User Tag</Button>
            </Grid>
            <Grid item >
              <Typography style={{textAlign: 'left'}}>
                {data.date}
              </Typography>
              <Typography >
                {<a href={data.url}>{data.url}</a>}
              </Typography> 
            </Grid>
            <Grid item  xs={12} sm={12} lg={12}>
              <Typography style={{textAlign: 'left', marginTop: '1em'}}>
                Notes:
              </Typography>
              <TextField 
                  value={data.notes}
                  multiline
                  xs={12} sm={12} lg={12}
                  style={{width: "100%", marginTop: '1em'}}
                  onChange={handleNoteChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              Color tag
              <div>
                <Radio {...controlProps('red')} sx={{ color: red[800], '&.Mui-checked': {color: red[600]} }}   />
                <Radio {...controlProps('yellow')} sx={{color: yellow[800], '&.Mui-checked': {color: yellow[600]} }}   />
                <Radio {...controlProps('blue')} sx={{color: blue[800], '&.Mui-checked': {color: blue[600]} }}  />
                <Radio {...controlProps('green')} sx={{color: green[800], '&.Mui-checked': {color: green[600]} }}   />
                <Radio {...controlProps('purple')} sx={{color: purple[800], '&.Mui-checked': {color: purple[600]} }}   />
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={()=>{navigate('/')}}
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 3, }}
          >
            Back
          </Button>
          <Button
            onClick={()=>handleSave()}
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 3, }}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>{handleOpenDialog()}}
          >
            Delete
          </Button>
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleted item will be gone from the database forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained" 
              color="error" 
              onClick={()=>{handleDelete()}}>
              Delete
            </Button>
            <Button onClick={handleCloseDialog} autoFocus>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token,
    user_id: state.user_id
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState()),
    onLogOut: () => dispatch(action.authLogout())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(QuoteView);