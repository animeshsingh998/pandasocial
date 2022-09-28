import { useSelector } from "react-redux";
import FollowerCard from "../FollowerCard/FollowerCard";
import Navbar from "../Navbar/Navbar";
import Posts from "../Posts/Posts";
import ProfileCard from "../ProfileCard/ProfileCard";
import SearchIcon from "../SearchIcon/SearchIcon";
import SharePost from "../SharePost/SharePost";
import "./HomeMid.css";

const HomeMid = () => {
  const { searchActive, sResults } = useSelector((state) => state.users);

  return (
    <div className="HomeMid">
      <Navbar />
      <SearchIcon />
      {searchActive ? (
        <div className="searchResult">
          <h2>Search Results</h2>
          {sResults && sResults.length > 0
            ? sResults.map((user) => (
                <FollowerCard key={user._id} user={user} />
              ))
            : "No users Found"}
        </div>
      ) : (
        <>
          <ProfileCard />
          <SharePost />
          <Posts />
        </>
      )}
    </div>
  );
};

export default HomeMid;
