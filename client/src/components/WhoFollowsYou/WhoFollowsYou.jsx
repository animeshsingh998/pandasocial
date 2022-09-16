import "./WhoFollowsYou.css";
import { Followers } from "../../Data/Data.js";
import FollowerCard from "../FollowerCard/FollowerCard";

const WhoFollowsYou = () => {
  return (
    <div className="WhoFollowsYou">
      <span>Who is Following you</span>
      {Followers && Followers.length > 0 ? (
        Followers.map((follower) => (
          <FollowerCard follower={follower} key={follower.id} />
        ))
      ) : (
        <span>You have no followers :(</span>
      )}
    </div>
  );
};

export default WhoFollowsYou;
