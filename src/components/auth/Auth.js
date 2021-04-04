import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider.js';
import jwt from 'jsonwebtoken';
import { If } from '../if/If.js';

function Auth({ capability, children }) {

  let context = useContext(AuthContext);
  const isAuthorized = (capability) => {
    let userData = jwt.decode(context.token);
    if(userData) {
      return userData.capabilities.includes(capability) ? true : false;
    }
    return false;
  }

  return (
    <>
      <If condition={isAuthorized(capability)}>
        {children}
      </If>
      <If condition={!isAuthorized(capability)}>
        <div style={{ width: '200px', height: '35vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p>Not Authorized</p>
        </div>
      </If>
    </>
  )
}

export default Auth;

