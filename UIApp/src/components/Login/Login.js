import React, { useState } from 'react';
import http from "../../http-common";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    http.get(`/api/login?username=${username}&password=${password}`);
  }

  return (
    <form>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}