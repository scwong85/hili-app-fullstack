import React, { useState, useEffect } from 'react';

import './Dashboard.css';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as action from '../../store/actions/auth';
import { getTokenUser } from '../../services/user.services';
import { getQuotes, getQuotesConfig, saveQuotesConfig, patchQuotesConfig, getQuotesTags } from '../../services/data.services';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';

import { Checkbox, TablePagination } from '@mui/material';
import { red, yellow, blue, green, purple } from '@mui/material/colors';
import { borderRight } from '@mui/system';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { ListItemSecondaryAction } from '@mui/material';
import RootRef from "@material-ui/core/RootRef";
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';

function Dashboard(props) {

  // quotesConfig
  const [quotesOrder, setQuotesOrder] = useState([]);

  const [selectedTag, setSelectedTag] = useState(['red', 'yellow', 'blue', 'green', 'purple']);
  const [dateValue, setDateValue] = React.useState([null, null]);

  const [user, setUser] = useState('')
  const [data, setData] = useState([]);
  const [currentSearchText, setCurrentSearchText] = useState('');
  const [quoteId, setQuoteId] = useState(0);

  const [allTags, setAllTags] = useState([])
  const [currentSelectedTags, setCurrentSelectedTags] = useState([])
  
  const token = window.localStorage.getItem('token');
  const [filteredData, setFilteredData] = useState([data]);
  const navigate = useNavigate(); 

  useEffect(() => {
    props.onTryAutoSignup();
  }, [])
  
  useEffect(() => {
    if (quotesOrder.length !== 0 && filteredData.length !== 0) {
      let tmpFilteredData = []
      quotesOrder.forEach(qid => {
        filteredData.forEach(element => {
          if(element.id === qid) {
            tmpFilteredData.push(element)
          }
        });
      });
  
      setFilteredData(tmpFilteredData)
    }
  }, [quotesOrder])

  useEffect(() => {
    if (!props.isAuthenticated) {
      navigate('/login/');
    } else if (props.isAuthenticated) {
      console.log('try to get quotes')
      let token_data = getTokenUser(token)
      setUser(token_data['username']);
      getQuotes()
        .then(res => {
          let tmpQuotesOrder = []
          let data_ids = res.data.map((res_data) => {return parseInt(res_data.id)})

          getQuotesConfig()
            .then(quote_res => {
              if(quote_res.data.length === 1) {
                setQuoteId(quote_res.data[0].id)
                tmpQuotesOrder = quote_res.data[0].quote_order.split(',').map((qid) => {return parseInt(qid)})
                let extra_ids = data_ids.filter(x => tmpQuotesOrder.indexOf(x)===-1) 
                tmpQuotesOrder.push(...extra_ids)
                setQuotesOrder(tmpQuotesOrder)
              } else if (quote_res.data.length > 1) {
                let target_item = quote_res.data.filter((items) => { return (items.user === parseInt(props.user_id))})
                setQuoteId(target_item[0].id)
                tmpQuotesOrder = target_item[0].quote_order.split(',').map((qid) => {return parseInt(qid)})
                let extra_ids = data_ids.filter(x => tmpQuotesOrder.indexOf(x)===-1)
                tmpQuotesOrder.push(...extra_ids)
                setQuotesOrder(tmpQuotesOrder)
              }
            })
            .catch(err => {
              console.log(err)
            })
          setData([...data, ...res.data]);
          setFilteredData([...res.data])

          getQuotesTags()
          .then(res=> {
            console.log('res', res.data.length)
            if (res.data.length === 1) {
              console.log('all tags', res.data)
              setAllTags(res.data[0].quote_tags.split(','))
            } else if (res.data.length > 1) {
              let target_item = res.data.filter((items) => { return (items.user === props.user_id)})
              console.log('admin all tags', props.user_id, target_item)
              setAllTags(target_item[0].quote_tags.split(','))
            }
          })
          .catch(err => {
            console.log(err);
          })

        })
        .catch(err => {
          console.log(err);
        })
      
      

    }
  }, [props.isAuthenticated])

  useEffect(() => {
    let result = [];

    let tmpFilteredData = []
    quotesOrder.forEach(qid => {
      data.forEach(element => {
        if(element.id === qid) {
          tmpFilteredData.push(element)
        }
      });
    });

    result = tmpFilteredData.filter((data) => {

      let dataDate = Date.parse(data.date)
      let dateCompare = true;
      let allTagsCompare = true;
      let startDate = dateValue[0];
      let endDate = new Date(dateValue[1]);
      endDate.setHours(23, 59, 59, 999);
      if (startDate !== null && endDate !== null) {
        dateCompare = dataDate >= Date.parse(startDate) && dataDate <= Date.parse(endDate);
      } 

      if (currentSelectedTags.length > 0) {
        allTagsCompare = data.user_tags.split(',').some(userTag => currentSelectedTags.includes(userTag));   
      }
      return (
        data.quote.toLowerCase().includes(currentSearchText) && selectedTag.includes(data.tag) 
        && dateCompare 
        && allTagsCompare
      );
    });
    setFilteredData(result);
  }, [selectedTag, currentSearchText, dateValue, currentSelectedTags])


  const handleQuoteClick = (qid) => {
    navigate(`/${qid}`);
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    setCurrentSearchText(value);
  }

  const handleChange = (event, tag) => {
    if (event.target.checked) {
      setSelectedTag([...selectedTag, tag])
    } else if (event.target.checked === false) {
      var array = [...selectedTag]; // make a separate copy of the array
      var index = array.indexOf(tag)
      if (index !== -1) {
        array.splice(index, 1);
        setSelectedTag(array);
      }
    }
  } 

  const allTagsChange = (event, values) => {
    console.log('tag change', values)
    setCurrentSelectedTags(values);
  }

  const saveOrPatchQuotesConfig = (qidList) => {

    console.log('save quotes config', quotesOrder.length, quoteId)

    if (quotesOrder.length === 0 || quoteId === 0) {
      getQuotesConfig()
      .then(res => {
        if (res.data.length === 0) {
          saveQuotesConfig({'quote_order' : qidList.toString()})
        } else if (res.data.length === 1) {
          patchQuotesConfig(res.data[0].id, {'quote_order' : qidList.toString()})
          setQuoteId(res.data[0].id)
        } else if (res.data.length > 1) {
          console.log('admin quote config')
          console.log(res.data.filter((items) => { return (items.user === props.user_id)}))

          let target_item = res.data.filter((items) => { return (items.user === parseInt(props.user_id))})
          setQuoteId(target_item[0].id)
          patchQuotesConfig(target_item[0].id, {'quote_order' : qidList.toString()})
        }
      })
    } else {
      console.log('quotelist', quotesOrder)
      patchQuotesConfig(quoteId, {'quote_order' : qidList.toString()})
    }
  }

  const sortTag = () => {
    let tmpData = [...filteredData]
    tmpData.sort((a,b) => (a.tag > b.tag) ? 1 : ((b.tag > a.tag) ? -1 : 0))
    setFilteredData(tmpData)
    let qidList = tmpData.map((item) => {
      return (item.id)
    })

    setQuotesOrder(qidList)
    saveOrPatchQuotesConfig(qidList)
  }

  const sortDate = () => {
    console.log('sort date')
    let tmpData = [...filteredData]
    tmpData.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    setFilteredData(tmpData)

    let qidList = tmpData.map((item) => {
      return (item.id)
    })

    setQuotesOrder(qidList)
    saveOrPatchQuotesConfig(qidList)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
  });
  
  const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });


  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      filteredData,
      result.source.index,
      result.destination.index
    );


    setFilteredData(
      items
    );

    let qidList = items.map((item) => {
      return (item.id)
    })
      setQuotesOrder(qidList)
      saveOrPatchQuotesConfig(qidList)
 
  }

  const renderDnDQuotes = (items) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {items.map((item, index) => (
                  <Paper sx={{m: 1}} key={index}>
                  <Draggable 
                    key={item.id} 
                    draggableId={ item.id !== undefined ? (item.id).toString() : item.id } 
                    index={index}
                    isDragDisabled={filteredData.length!==data.length}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        sx = {{ background: `linear-gradient(to bottom right, ${item.tag}, white, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)` }}
                      >

                        <ListItemText
                          primary={item.quote}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.date}
                              </Typography>
                              <Typography component="span" sx={{ml: '1em'}}>
                                {<a href={item.url}>Source</a>}
                              </Typography>
                            </React.Fragment>
                          }
                          sx = {{ m: 2 }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton  onClick={()=>handleQuoteClick(item.id)} >
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                  </Paper>

                ))}
                {provided.placeholder}
              </List>

            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    )
      
  }


  return(
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Grid container sx={{ justifyContent: 'space-between', padding: '1em' }}>
        <Grid container sx={{ justifyContent: 'space-around' }}>
          <Grid item xs={12} sm={12} lg={4} sx={{m: '1em'}}> 
            <TextField placeholder='Search' onChange={(event) =>handleSearch(event)} />
          </Grid>
          {
            allTags.length > 0 ?
            <Grid item  xs={12} sm={12} lg={4} sx={{m: '1em'}}>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={allTags}
                onChange={allTagsChange}
                renderInput={(params) => (
                  <TextField {...params} label="" placeholder='Select Tags'/>
                )}
                
              />
            </Grid>
            :
            <></>
          }
        </Grid>
        

        <Grid container sx={{ justifyContent: 'space-around', padding: '1em' }}>
          <Grid item >
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <Stack spacing={3}>
                <div id='mobile-date-container'>
                  
                  <MobileDateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    value={dateValue}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </div>
                
                <div id='desktop-date-container'>
                  <DesktopDateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    value={dateValue}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </div>
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item>
            <Checkbox defaultChecked sx={{ color: red[800], '&.Mui-checked': {color: red[600]} }}  onChange={(event)=>handleChange(event, 'red')} />
            <Checkbox defaultChecked sx={{color: yellow[800], '&.Mui-checked': {color: yellow[600]} }}  onChange={(event)=>handleChange(event, 'yellow')} />
            <Checkbox defaultChecked sx={{color: blue[800], '&.Mui-checked': {color: blue[600]} }}  onChange={(event)=>handleChange(event, 'blue')} />
            <Checkbox defaultChecked sx={{color: green[800], '&.Mui-checked': {color: green[600]} }}  onChange={(event)=>handleChange(event, 'green')} />
            <Checkbox defaultChecked sx={{color: purple[800], '&.Mui-checked': {color: purple[600]} }}  onChange={(event)=>handleChange(event, 'purple')} />
          </Grid>

        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button
            onClick={sortTag}
          >
            Sort by tag color</Button>
        </Grid>
        <Grid item>
          <Button
            onClick={sortDate}
          >
            Sort by date</Button>
        </Grid>
      </Grid>
      <Divider />
      {
        //filteredData.map(renderQuotes) 
        renderDnDQuotes(filteredData)
      }
    </List>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);