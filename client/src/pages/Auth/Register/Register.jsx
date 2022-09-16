import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../Actions/userAction';
import loader from '../../../assets/images/loader.gif';
import './Register.css'

const Register = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.users);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "clearUsersError" });
    dispatch(registerUser(email, username, password));
  }
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <h4 className="infoTxtReg">*{error}</h4>}
      <button type="submit" className="btn auth-btn">
        {loading ? (
          <img src={loader} alt="loading.." className="loaderBtn" />
        ) : (
          "SignUp"
        )}
      </button>
    </form>
  );
}

export default Register