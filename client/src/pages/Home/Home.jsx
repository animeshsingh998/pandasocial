import HomeLeft from '../../components/HomeLeft/HomeLeft'
import HomeMid from '../../components/HomeMid/HomeMid'
import HomeRight from '../../components/HomeRight/HomeRight'
import './Home.css' 

const Home = () => {
  return (
      <div className="Home">
          <HomeLeft/>
          <HomeMid/>
          <HomeRight/>
    </div>
  )
}

export default Home