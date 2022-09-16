import { useState } from 'react'
import './Login.css'
import { useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../../../Actions/userAction';
import loader from '../../../assets/images/loader.gif';

const Login = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({type: "clearUsersError"})
    dispatch(loginUser(email, password));
  }
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <h4 className="infoTxtLog">*{error}</h4>}
      <button type="submit" className="btn auth-btn">
        {loading ? (
          <img src={loader} alt="loading.." className="loaderBtn" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}

export default Login