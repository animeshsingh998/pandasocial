import './FollowerCard.css';
import noProfile from '../../assets/images/noprofile.jpg';
import {Link} from 'react-router-dom'

const FollowerCard = ({user}) => {
  return (
    <div className="FollowerCard">
      <div className="followerLogo">
        <Link to={`/user/${user._id}`}>
          <img
            src={user.avatar[0].url ? user.avatar[0].url : noProfile}
            alt="pic"
          />
        </Link>
      </div>
      <div className="followerInfo">
        <div className="usernames">
          <Link to={`/user/${user._id}`}>
            <span>{user.name}</span>
          </Link>
          <Link to={`/user/${user._id}`}>
            <span>@{user.username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FollowerCard