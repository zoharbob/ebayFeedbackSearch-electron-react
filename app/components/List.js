import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const feedbackArray = [
  {
    "feedback": "Great item A+++",
    "rating": "positive",
    "when": "one month ago"
  },
  {
    "feedback": "fast shipping",
    "rating": "positive",
    "when": "2 months ago"
  },
  {
    "feedback": "ok",
    "rating": "nuteral",
    "when": "one month ago"
  },
  {
    "feedback": "Work as expected A+++",
    "rating": "positive",
    "when": "2 months ago"
  },
  {
    "feedback": "never arrived",
    "rating": "negative",
    "when": "one month ago"
  },
  {
    "feedback": "Great Seller",
    "rating": "positive",
    "when": "3 months ago"
  },
  {
    "feedback": "Item was broken",
    "rating": "negative",
    "when": "one month ago"
  }
]

const getListItemsByValue = (value, data) => {

  switch (value) {
    case 0: {
      return {
        filteredArr: data.filter( ({rating}) => rating === 'positive'),
        listItemColor: 'lightgreen'
      }
    }
    case 1: {
      return {
        filteredArr: data.filter( ({rating}) => rating === 'natural'),
        listItemColor: 'lightgrey'
      }
    }
    case 2: {
      return {
        filteredArr: data.filter( ({rating}) => rating === 'negative'),
        listItemColor: '#F67A7A'
      }

    }
  }
}

const FolderList = ({tabValue, data}) => {

  const {filteredArr, listItemColor} = getListItemsByValue(tabValue, data);

  return (
    <div>
      <List>
        {
          filteredArr.map( ({feedback, when}, i) => (
            <ListItem key={i} style={{backgroundColor: listItemColor}}>
              <ListItemText primary={feedback} secondary={when} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

export default FolderList;
