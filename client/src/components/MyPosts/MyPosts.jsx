import "./MyPosts.css";
import Post from "../Post/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getTimeline } from "../../Actions/postAction";

const MyPosts = ({profile}) => {
  const dispatch = useDispatch();
  const { myPosts } = useSelector((state) => state.posts);
  const { postsOfUser } = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getTimeline());
    dispatch(getMyPosts());
  }, [dispatch]);
  return (
    <>
      {profile ? (
        <div className="Posts">
          {myPosts && myPosts.length > 0 ? (
            myPosts.map((post) => (
              <Post
                post={post}
                key={post._id}
                isImage={post.image.url ? true : false}
                del={true}
              />
            ))
          ) : (
            <h3 style={{ padding: "0 20px" }}>
              You haven't made any post yet, click on the Post button above to
              share your first post
            </h3>
          )}
        </div>
      ) : (
        <div className="Posts">
          {postsOfUser && postsOfUser.length > 0 ? (
            postsOfUser.map((post) => (
              <Post
                post={post}
                key={post._id}
                isImage={post.image.url ? true : false}
                del={true}
              />
            ))
          ) : (
            <h3 style={{ padding: "0 20px" }}>
              No Posts Yet
            </h3>
          )}
            {/* user ki posts */}
        </div>
      )}
    </>
  );
};

export default MyPosts;
