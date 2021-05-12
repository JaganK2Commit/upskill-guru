import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
          width: 300,
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

const Tags = ({value, placeholder, label, options, limitTags, handleChange, handleSelection, defaultValue}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Autocomplete
        defaultValue={defaultValue}
        value={value}
        autoSelect
        limitTags={limitTags}
        fullWidth={true}
        options={ options }
        onChange={(e, v) => handleSelection(v)}
        getOptionLabel={option => option.label || ""}
        getOptionSelected={(option, value) => option.value === value.value }
        renderInput={(params) => (
          <TextField 
            placeholder={placeholder}
            label={label}
            onChange={ e => handleChange(e.target.value) }
            {...params}
            variant="outlined"
            
            size="small"
          />
        )}
      />
  );
}

export default Tags;