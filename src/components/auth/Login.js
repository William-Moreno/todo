import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider.js';
import useForm from '../hooks/form/useForm.js';
import { If } from '../if/If.js';

function Login() {

  let context = useContext(AuthContext);
  let [values, handleInputChange, handleFormSubmit] = useForm(handleLogin);

  function handleLogin(userDetails) {
    context.login(userDetails.username, userDetails.password);
  }

  return (
    <>
      <If condition={!context.token}>
        <form onSubmit={handleFormSubmit}>
          <input name="username" onChange={handleInputChange} />
          <input name="password" onChange={handleInputChange} />
          <button type="submit">Login</button>
        </form>
      </If>
      <If condition={context.token}>
        <button onClick={context.logout}>
          Logout
        </button>
      </If>
      </>
  )
}

export default Login;