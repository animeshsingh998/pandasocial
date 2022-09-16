import "./Post.css";
import {
  Favorite,
  FavoriteBorder,
  CommentOutlined,
  Send,
  Delete,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeDislikePost, getTimeline, getMyPosts, delPost } from "../../Actions/postAction";
import { getUserById, loadMyProfile } from "../../Actions/userAction";

const Post = ({ post, isImage, del = false }) => {
  const { user, userById } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (post.likes.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    };
  }, [post.likes, liked, user._id]);
  
  const handleLike = () => {
    dispatch(likeDislikePost(post._id));
    setTimeout(() => {
      dispatch(getTimeline());
      dispatch(getMyPosts());
      dispatch(getUserById(userById._id))
    }, 100);
  };

  const handleDelete = () => {
    if (window.confirm("Delete Post?")) {
      dispatch(delPost(post._id));
      setTimeout(() => {
        dispatch(getMyPosts());
        dispatch(loadMyProfile());
      }, 300);
    }
  }
  return (
    <div className="Post">
      {isImage ? (
        <div className="postTop">
          <img src={post.image.url} alt="Post" />
        </div>
      ) : (
        <div className="postInfo">
          <span>{post.userId.username}</span>
          <span>{post.desc}</span>
        </div>
      )}
      <div className="postMid">
        <div className="postReactions">
          <div className="postIcons">
            {liked ? (
              <Favorite
                style={{ color: "var(--primary-color)" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorder
                style={{ color: "var(--primary-color)" }}
                onClick={handleLike}
              />
            )}
            <CommentOutlined />
            <Send style={{ color: "#3D2C8D" }} />
            {del && post.userId._id === user._id && (
              <Delete style={{ color: "red" }} onClick={handleDelete} />
            )}
          </div>
        </div>
        <div className="postLikes">
          <span>{post.likes.length}</span>
          <span>Likes</span>
        </div>
      </div>
      {isImage && (
        <div className="postBot">
          <div className="postInfo">
            <span>{post.userId.username}</span>
            <span>{post.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
