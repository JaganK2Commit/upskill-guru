import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {data} from '../UserData';
import {skillsData} from '../SkillData';
// fluent-ui imports
import {PrimaryButton,DefaultButton,ActionButton,IIconProps} from '@fluentui/react';

// fluent-ui icons
const editIcon: IIconProps = { iconName: 'edit' };
// useStyles

const useStyles = makeStyles((theme) => ({
  root: {
    width: 750,
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
          width:632,
          height:40
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input':{
        fontSize:"16px"
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
    value:[]
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
    <div className={classes.root}>
   
      <Autocomplete
        multiple
        borderless
        disableClearable
        classes={{ paper: classes.paper }}
        limitTags={2}
        id="tags-standard"
        options={skillData}
        onChange={handleChange}
        getOptionLabel={(option) => option.title}
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


const skillData = [
    {title:skillsData[0].skillName},
    {title:skillsData[1].skillName},
    {title:skillsData[2].skillName},
    {title:skillsData[3].skillName},
    {title:skillsData[4].skillName},
    {title:skillsData[5].skillName},
    {title:skillsData[6].skillName},
    {title:skillsData[7].skillName},

];
