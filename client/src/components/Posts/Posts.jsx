import "./Posts.css";
import Post from "../Post/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getTimeline } from "../../Actions/postAction";

const Posts = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector((state) => state.posts);
  const token = window.localStorage.getItem("jwt");
  useEffect(() => {
    token && dispatch(getTimeline(token));
    token && dispatch(getMyPosts(token));
  }, [dispatch, token]);
  return (
    <div className="Posts">
      {timeline && timeline.length > 0 ? (
        timeline.map((post) => (
          <Post
            post={post}
            key={post._id}
            isImage={post.image.url ? true : false}
          />
        ))
      ) : (
        <h3>No Posts Yet, follow your friends to see their posts</h3>
      )}
    </div>
  );
};

export default Posts;
