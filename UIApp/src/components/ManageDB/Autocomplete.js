import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {data} from '../UserData';
import {skillsData} from './SkillData';
import clsx from 'clsx'
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
export default function Tags({data,dataa}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [state, setstate] = React.useState({
    value:dataa.skills
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
    <div className={ clsx(classes.root),"root-table"}>
      <Autocomplete
        multiple
        borderless
        disableClearable
        classes={{ paper: classes.paper }}
        limitTags={2}
        id="tags-standard"
        options={skillsData}
        onChange={handleChange}
        getOptionLabel={(option) => option}
        value={state.value}
        renderInput={(params) => (
          <TextField borderless
          className={classes.textfield}
            {...params}
            variant="outlined"
            placeholder={`${data ? 'Add Skills':'Add a new skill'}`}
            size="small"
          />
        )}
      />
    </div>
  );
}

