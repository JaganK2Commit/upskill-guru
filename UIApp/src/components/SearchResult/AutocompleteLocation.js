import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LocationService from "../../services/LocationService";

// fluent-ui icons
// const editIcon: IIconProps = { iconName: 'edit' };
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
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input':{
        fontSize:"14px"
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
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [location, setLocation] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  }
  return (
    <div className={classes.root}>
      <Autocomplete
        borderless
        disableClearable
        autoSelect
        classes={{ paper: classes.paper }}
        limitTags={1}
        options={ locationSuggestions.map((loc) => `${loc.city}, ${loc.state}`) }
        renderInput={(params) => (
          <TextField borderless
            className={classes.textfield}
            onChange={ e => handleChange(e.target.value) }
            {...params}
            variant="outlined"
            placeholder={`${data ? 'Location':'Enter location'}`}
            value = {location}
            size="small"
          />
        )}
      />
    </div>
  );
}

