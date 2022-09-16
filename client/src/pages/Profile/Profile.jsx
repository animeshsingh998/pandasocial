import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../Actions/userAction";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileMid from "../../components/ProfileMid/ProfileMid";
import ProfileRight from "../../components/ProfileRight/ProfileRight";
import "./Profile.css";

const Profile = ({ profile }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserById(id));
  },[dispatch, id])
  return (
    <div className="Profile">
      <ProfileLeft profile={profile} />
      <ProfileMid profile={profile} />
      <ProfileRight />
    </div>
  );
};

export default Profile;
