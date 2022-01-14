import React, { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';
import { Paper, Typography } from "@mui/material";
import { getQuotes } from "../../services/data.services";
import * as action from '../../store/actions/auth';

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
    Title
  } from '@devexpress/dx-react-chart-material-ui';

import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';


import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const removeStopword = (string) => {
  let sw = require('stopword')
  let punctuationless = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  let finalString = punctuationless.replace(/\s{2,}/g," ").toLowerCase();
  return sw.removeStopwords(finalString.split(' '));
}


function Statistics(props) {
  
  const [quoteData, setQuoteData] = useState([]);
  const [filteredData, setFilteredData] = useState([quoteData]);
  const [tagDict, setTagDict] = useState({});
  const [allTagDict, setAllTagDict] = useState({});
  const [wordDict, setWordDict] = useState({});
  const [tagCountList, setTagCountList] = useState([]);
  const [allTagCountList, setAllTagCountList] = useState([]);
  const [wordCountList, setWordCountList] = useState([]);

  const [selectedTag, setSelectedTag] = useState(['red', 'yellow', 'blue', 'green', 'purple']);


  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('try to sign up')
    props.onTryAutoSignup();
  }, [])

  useEffect(()=> {
    if (!props.isAuthenticated) {
      navigate('/login/');
    } else if (props.isAuthenticated) {
      getQuotes()
        .then(res => {
          setQuoteData(res.data);
          res.data.map(calculateTagFrequency)
        })
        .catch(err =>{
          console.log(err);
        })
    }
  }, [props.isAuthenticated])

  useEffect(() => {
    console.log(wordCountList)
  }, [wordCountList])



  const calculateTagFrequency = (item, index) => {
    console.log('calculate for', item)
    let tmpTagDict = tagDict;
    if (tmpTagDict[item.tag] !== undefined) {
      tmpTagDict[item.tag] += 1;
    } else {
      tmpTagDict[item.tag] = 1
    }
    setTagDict(tmpTagDict);
    console.log(tagDict);
    let tagKey = Object.keys(tmpTagDict);
    let tagVal = Object.values(tmpTagDict);
    let tagCount = tagKey.map(function(a, index) { return {'argument':a.toUpperCase(), 'value':tagVal[index]} })
    setTagCountList(tagCount);
    console.log(tagCount);

    let tmpAllTagDict = allTagDict;
    item.user_tags.split(',').map((tag) => {
      if (tmpAllTagDict[tag] !== undefined) {
        tmpAllTagDict[tag] += 1;
      } else {
        tmpAllTagDict[tag] = 1
      }
    })
    setAllTagDict(tmpAllTagDict)
    let allTagKey = Object.keys(tmpAllTagDict);
    let allTagVal = Object.values(tmpAllTagDict);
    let allTagCount = allTagKey.map(function(a, index) { return {'text':a, 'value':allTagVal[index]} })
    setAllTagCountList(allTagCount);

    console.log(allTagCount)

    let tmpWordDict = wordDict;
    let newString = removeStopword(item.quote)
    for (index in newString) {
      let word = newString[index]
      if (tmpWordDict[word] !== undefined) {
        tmpWordDict[word] += 1;
      } else {
        tmpWordDict[word] = 1
      }
    }
    setWordDict(tmpWordDict);
    let wordKey = Object.keys(tmpWordDict);
    let wordVal = Object.values(tmpWordDict);
    let wordCount = wordKey.map(function(a, index) { return {'text':a, 'value':wordVal[index]} })
    setWordCountList(wordCount);
  }

  const calculateWordFrequency = (list) => {
    console.log('calculate word freq', list)
    let tmpWordDict = {};
    list.map((item, index) => {
      let newString = removeStopword(item.quote)
      for (index in newString) {
        let word = newString[index]
        if (tmpWordDict[word] !== undefined) {
          tmpWordDict[word] += 1;
        } else {
          tmpWordDict[word] = 1
        }
      }
    })
    
    setWordDict(tmpWordDict);
    let wordKey = Object.keys(tmpWordDict);
    let wordVal = Object.values(tmpWordDict);
    let wordCount = wordKey.map(function(a, index) { return {'text':a, 'value':wordVal[index]} })
    setWordCountList(wordCount);
  }


  const handleClick = (clickedData, index) => {

    let clickedTag = clickedData.argument.toLowerCase();
    let currentSelectedTag = [...selectedTag]
    console.log(clickedTag, selectedTag)
    if (selectedTag.includes(clickedTag) === false) {
      currentSelectedTag = currentSelectedTag.concat(clickedTag)
      console.log('current selected tag', currentSelectedTag)
      setSelectedTag([...selectedTag, clickedTag])
    } else if (selectedTag.includes(clickedTag)) {
     
      var aIndex = currentSelectedTag.indexOf(clickedTag)
      if (aIndex !== -1) {
        currentSelectedTag.splice(aIndex, 1);
        setSelectedTag(currentSelectedTag);
      }
    }
    let result = [];
    result = quoteData.filter((argdata) => { 
      return (currentSelectedTag.includes(argdata.tag));
    });
    setFilteredData(result);
    calculateWordFrequency(result);
  };

  const renderChart = () => {
    return (
      <div style={{ width: '100%' }}>
        <Typography>Number of entries per tag. </Typography>
        <Typography>Click on the bars to filter word cloud   </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={tagCountList}>
            <XAxis dataKey="argument" />
            <YAxis />
            <Bar dataKey="value" onClick={handleClick}>
              {tagCountList.map((entry, index) => (
                <Cell cursor="pointer" fill={selectedTag.includes(entry.argument.toLowerCase()) ? entry.argument.toLowerCase() : 'grey'} key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
      </div>
    );
  }

  return (
    <div>
      <Paper sx={{ mb: '2em' }}>
        <ReactWordcloud words={wordCountList} />
      </Paper>
      
      <Paper>
        {
          renderChart()
        }
      </Paper>

      {
        /**
        <Paper>
        <Chart
          data={tagCountList}
          palette="Soft"
        >
          <ArgumentAxis />
          <ValueAxis />
      
          <BarSeries valueField="value" argumentField="argument" />
          <Title
            text="Number of records per colour tag"
            />
        </Chart>
      </Paper>
      **/
      }


    </div>
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);