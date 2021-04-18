import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {locationData} from './Locations';
// fluent-ui imports
import {PrimaryButton,DefaultButton,ActionButton,IIconProps} from '@fluentui/react';

// fluent-ui icons
const editIcon: IIconProps = { iconName: 'edit' };
// useStyles

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    display:'inline-flex',
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
        borderWidth:"1px",
        borderColor:"#000",
        borderRadius:"0px"
    },
    '& .MuiOutlinedInput-notchedOutline':{
        borderRadius:"0px"
    },
    '& .Mui-paper		':{
    }
  },
  paper: {
    zIndex:999,
  },
  textfield:{
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]':{
          padding:"2px",
          width:300,
          height:40
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input':{
        fontSize:"16px",
        color: "black"
      },
      '& .MuiChip-root':{
          height:"auto",
          fontSize:"12px"
      },
  },
}));

// main fiunction
export default function Tags({data}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [state, setstate] = React.useState({
    value:[locationData[0]]
  })
// handleClickOpen
  const handleClickOpen = () => {
    setOpen(true);
  };
// handleClose
  const handleClose = () => {
    setOpen(false);
  };
  // handleChange
  const handleChange = (e,v) => {
    setstate({...state,value:v})
  }
  return (
    <div>
   
      <Autocomplete
        borderless
        disableClearable
        freeSolo
        autoSelect
        classes={{ paper: classes.paper }}
        limitTags={2}
        options={locationData}
        onChange={handleChange}
        getOptionLabel={option => option.title?option.title:option}
        value={state.value}
        renderInput={(params) => (
          <TextField borderless
          className={classes.textfield}
            {...params}
            variant="outlined"
            placeholder={`${data ? 'Location':'Enter location'}`}
            size="small"
          />
        )}
      />

    </div>
  );
}

