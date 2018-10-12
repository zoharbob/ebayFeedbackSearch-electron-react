import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    width: 100 + '%',
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    maxHeight: window.innerHeight - 168
  }
});

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

const FolderList = ({tabValue, data, classes}) => {

  const {filteredArr, listItemColor} = getListItemsByValue(tabValue, data);

  return (
    <div>
      <List className={classes.root}>
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

export default withStyles(styles)(FolderList);
