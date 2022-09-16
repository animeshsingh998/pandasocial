import "./ProfileCard.css";
import noProfile from '../../assets/images/noprofile.jpg'
import noCover from '../../assets/images/nocover.jpg'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileCard = ({ profile = true, ownProfile}) => {
  const { user, userById } = useSelector(state => state.users);
  const dispatch = useDispatch();
  return (
    <div className="ProfileCard">
      <div className="pcardTop">
        <div className="coverImg">
          {profile ? (
            <img
              src={user && (user.cover[0].url ? user.cover[0].url : noCover)}
              alt="cover"
              className="cardCover"
            />
          ) : (
            <img
              src={
                userById &&
                (userById.cover[0].url ? userById.cover[0].url : noCover)
              }
              alt="cover"
              className="cardCover"
            />
          )}
          {profile ? (
            <img
              src={
                user && (user.avatar[0].url ? user.avatar[0].url : noProfile)
              }
              alt="profile"
              className="cardProfilePic"
            />
          ) : (
            <img
              src={
                userById &&
                (userById.avatar[0].url ? userById.avatar[0].url : noProfile)
              }
              alt="profile"
              className="cardProfilePic"
            />
          )}
        </div>
      </div>
      <div className="pcardMid">
        {profile ? (
          <span>{user && (user.name ? user.name : user.username)}</span>
        ) : (
          <span>
            {userById && (userById.name ? userById.name : userById.username)}
          </span>
        )}
        {profile ? (
          <span>
            {user && (user.profession ? user.profession : "PandaSocial User")}
          </span>
        ) : (
          <span>
            {userById &&
              (userById.profession ? userById.profession : "PandaSocial User")}
          </span>
        )}
      </div>
      <div className="pcardBot">
        <hr className="hrCol" />
        <div className="botInfo">
          <div className="follow">
            {profile ? (
              <span>{user && user.followers.length}</span>
            ) : (
              <span>{userById && userById.followers.length}</span>
            )}
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            {profile ? (
              <span>{user && user.following.length}</span>
            ) : (
              <span>{userById && userById.following.length}</span>
            )}
            <span>followings</span>
          </div>
          {ownProfile && (
            <>
              <div className="vl"></div>
              <div className="follow">
                {profile ? (
                  <span>{user && (user.posts.length)}</span>
                ) : (
                  <span>{userById && (userById.posts.length)}</span>
                )}
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        {!ownProfile && (
          <>
            <hr className="hrCol" />
            <div
              className="profs"
              onClick={() => dispatch({ type: "clearSearchActive" })}
            >
              <Link to={"/profile"} className="myProf">
                My Profile
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
