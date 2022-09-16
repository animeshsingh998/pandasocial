import ProfileInfoCard from "../ProfileInfoCard/ProfileInfoCard";
import "./ProfileLeft.css";

const ProfileLeft = ({ profile }) => {
  return (
    <div className="ProfileLeft">
      <ProfileInfoCard profile={profile} />
    </div>
  );
};

export default ProfileLeft;
