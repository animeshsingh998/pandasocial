import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadMyProfile } from './Actions/userAction';


const App = () => {
  const token = window.localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(loadMyProfile(token));
  }, [dispatch, token]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile profile={true} /> : <Auth />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <Profile profile={false} /> : <Auth />}
        />
      </Routes>
    </div>
  );
}

export default App
