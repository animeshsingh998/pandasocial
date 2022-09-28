import { useDispatch } from 'react-redux'
import HomeLeft from '../../components/HomeLeft/HomeLeft'
import HomeMid from '../../components/HomeMid/HomeMid'
import HomeRight from '../../components/HomeRight/HomeRight'
import { useEffect } from "react";
import { loadMyProfile } from "./Actions/userAction";
import './Home.css' 

const Home = () => {
  const token = window.localStorage.getItem('jwt');
    const dispatch = useDispatch();
    useEffect(() => {
      token && dispatch(loadMyProfile(token));
    }, [dispatch, token]);
  return (
      <div className="Home">
          <HomeLeft/>
          <HomeMid/>
          <HomeRight/>
    </div>
  )
}

export default Home