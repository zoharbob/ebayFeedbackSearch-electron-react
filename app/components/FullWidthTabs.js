import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from './List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Header from './Header';

class FullWidthTabs extends React.Component {
  constructor(props) {
    super(props);

    this._input = null;
    this._method = null;
    this.state = {
      value: 0,
      data: null,
      searching: false,
      error: false,
      open: false,
      searchResults: {positive: 0, negative: 0, natural: 0},
    }
  }

  getFeedback = () => {
    this.setState({searching: true, error: false, data: null}, () => {
      fetch(`http://ebay-feedback-search.herokuapp.com/url_analyse?url_input=${this._input.value}&method_select=${this._method.value}&mobile=true`)
        .then((response) => response.json())
        .then(result => {
            let searchResults = this.checkResults(result) || this.state.searchResults;
            return this.setState(({data: result, open: result.length > 0 ? true : false ,searching: false, searchResults }))
        }).catch(() => {
          this.setState({error: true});
      })
    })
  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.getFeedback()
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  setTabLabel = () => {
    let { data, searchResults } = this.state;

    if(data && data.length > 0) {
      return {posLabel: `Positive (${searchResults.positive})`, neuLabel: `Neutral (${searchResults.natural})`, negLabel: `Negative (${searchResults.negative})`};
    }

    return {posLabel: 'Positive', neuLabel: 'Neutral', negLabel: 'Negative'};
  }

  checkResults = (result) => {
    if(result.length > 0) {
      return result.reduce((total, {rating}) => {
        total[rating] += 1;

        return total;
      }, {positive: 0, negative: 0, natural: 0});
    }
  }

  renderSearching = () => {
     if(this.state.error) {
       return (<Typography variant="headline" gutterBottom style={{marginRight: 20}}>Error, please try again...</Typography>)
     }
     else if(this.state.searching) {
      return (
        <React.Fragment>
          <Typography variant="headline" gutterBottom style={{marginRight: 20}}>Looking for feedback...</Typography>
          <CircularProgress size={50} />
        </React.Fragment>
      )
    } else if(this.state.data !== null && this.state.data.length === 0) {
      return (
          <Typography variant="subheading" gutterBottom style={{textAlign: 'center'}}>No Feedback Found! Try choosing different type of search or there are no feedback for this item.</Typography>
      )
    }
  }

  render() {

    const { value, data, open, searchResults: {positive, negative, natural} } = this.state;

    const tabLabels = this.setTabLabel();

    return (
      <div>
        <div style={{padding: 10}}>
          <form onSubmit={this.handleSubmit}>
            <Header inputRef={input => this._input = input} methodRef={method => this._method = method}/>
          </form>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10}}>
          { this.renderSearching() }
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={tabLabels.posLabel} />
            <Tab label={tabLabels.neuLabel} />
            <Tab label={tabLabels.negLabel} />
          </Tabs>
        </AppBar>
        {this.state.data ? <List tabValue={value} data={data} /> : undefined}

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Positive: {positive}, Neutral: {natural} Negative: {negative} </span>}
        />
      </div>
    );
  }
}


export default FullWidthTabs;
