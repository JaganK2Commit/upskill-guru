import React, { useState } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react';
import http from "../../http-common";
import { Redirect } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await http.get(`/api/login?username=${username}&password=${password}`);

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      return <Redirect to='/' />
    }
  }

  return (
    <Stack tokens={{childrenGap: 15}}>
      <Stack vertical tokens={{childrenGap: 15}} styles={{root: {width: 300}}}>
        <TextField label='Username' required onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" required type='password' canRevealPassword onChange={e => setPassword(e.target.value)} />
        
        <PrimaryButton 
          text="submit" 
          onClick={handleSubmit}
          styles={{root: {width: 100}}}>
            Submit
        </PrimaryButton>
      </Stack>
    </Stack>
  )
}