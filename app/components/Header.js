import React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';

const Header = ({ inputRef, methodRef }) => (
  <React.Fragment>
    <TextField
      label="Enter URL"
      margin="normal"
      variant="outlined"
      inputRef={inputRef}
      style={{width: '75%'}}
    />
    <NativeSelect defaultValue={3} input={<Input name="name" id="uncontrolled-native" inputRef={methodRef} />} style={{marginTop: 23, marginLeft: 30, width: '20%'}}>
      <option value="3">Standard Search (Quick)</option>
      <option value="10">Medium Search (Long)</option>
      <option value="20">Deep Search (Very Long)</option>
    </NativeSelect>
  </React.Fragment>
)

export default Header;
