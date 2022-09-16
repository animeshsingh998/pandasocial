import MyPosts from '../MyPosts/MyPosts'
import Navbar from '../Navbar/Navbar'
import ProfileCard from '../ProfileCard/ProfileCard'
import ProfileInfoCard from '../ProfileInfoCard/ProfileInfoCard'
import SharePost from '../SharePost/SharePost'
import './ProfileMid.css'

const ProfileMid = ({profile}) => {
  return (
    <div className="ProfileMid">
      <Navbar />
      <ProfileCard profile={profile} ownProfile={true} />
      <ProfileInfoCard profile={profile} />
      {profile && <SharePost />}
      <MyPosts profile={profile} />
    </div>
  );
}

export default ProfileMid