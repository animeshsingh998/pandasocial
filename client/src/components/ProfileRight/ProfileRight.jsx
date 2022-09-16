import Navbar from '../Navbar/Navbar';
import TrendsCard from '../TrendsCard/TrendsCard';
import './ProfileRight.css'
import animesh from '../../assets/images/animesh-bg.png'

const ProfileRight = () => {
  return (
    <div className="ProfileRight">
      <Navbar />
      <TrendsCard />
      <div className="animesh">
        <a
          href="https://www.instagram.com/_big_fat_panda_007/"
          target={"_blank"}
          rel="noreferrer"
        >
          <img src={animesh} alt="animesh" />
        </a>
      </div>
    </div>
  );
}

export default ProfileRight