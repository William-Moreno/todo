import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import useAjax from '../components/hooks/ajax/useAjax.js';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

const API_URL = 'https://api-js401.herokuapp.com';

function AuthProvider(props) {

  let [user, setUser] = useState({});
  let [token, setToken] = useState('');
  let [request, response] = useAjax();

  
  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      setToken(token);
    }
  }, []);
  
  useEffect(() => {
    console.log(response);
    if (_isValidUser(response.token)) {
      setUser(response.user);
      setToken(response.token);
      cookie.save('auth', response.token);
    }
  // eslint-disable-next-line 
  }, [response]);

  const _isValidUser = (token) => {
    const validUser = jwt.decode(token);
    if (validUser) {
      if (validUser.username === user.username) return true;
    } else {
      return false
    }
  }


  const login = (username, password) => {
    let options = {
      url: `${API_URL}/signin`,
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      }
    }
    request(options);
  }

  const logout = () => {
    setUser({});
    setToken('');
    cookie.remove('auth');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;