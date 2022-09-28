import "./SharePost.css";
import { useState } from "react";
import noProfile from "../../assets/images/noprofile.jpg";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../assets/images/loader.gif";
import {
  AddPhotoAlternate,
  PlayCircleOutline,
  LocationOnOutlined,
  CalendarMonth,
  Close,
} from "@mui/icons-material";
import { addPost, getMyPosts, getTimeline } from "../../Actions/postAction";
import { useEffect } from "react";

const SharePost = () => {
  const dispatch = useDispatch();
  const [sharePhoto, setSharePhoto] = useState(null);
  const [valid, setValid] = useState(true);
  const [desc, setDesc] = useState("");
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.posts);
  const token = window.localStorage.getItem("jwt");
  const handleFile = (e) => {
    const photoRaw = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(photoRaw);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setSharePhoto(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addPost(desc, sharePhoto, token));
    setSharePhoto(null);
    setDesc("");
    await dispatch(getTimeline(token));
    dispatch(getMyPosts(token));
  };
  useEffect(() => {
    if (desc.length > 2) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [desc, valid]);

  return (
    <div className="SharePost">
      <div className="spTop">
        <img src={user.avatar[0].url || noProfile} alt="logo" />
        <input
          type="text"
          placeholder="What's in your mind"
          required
          value={desc.length < 1 ? "" : desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="spBot">
        <div className="spBotLogo">
          <label htmlFor="sharePhoto" className="spBotLogo">
            <AddPhotoAlternate />
            <span>Photo</span>
          </label>
          <input
            type="file"
            name="sharePhoto"
            id="sharePhoto"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e)}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div className="spBotLogo">
          <PlayCircleOutline />
          <span>Video</span>
        </div>
        <div className="spBotLogo schl">
          <LocationOnOutlined />
          <span>Location</span>
        </div>
        <div className="spBotLogo schl">
          <CalendarMonth style={{ color: "#BE9FE1" }} />
          <span style={{ color: "#BE9FE1" }}>Schedule</span>
        </div>
        <button
          className="btn share-btn"
          onClick={handleSubmit}
          disabled={valid || loading}
        >
          {loading ? (
            <img src={loader} alt="loading.." className="loaderBtn" />
          ) : (
            "Post"
          )}
        </button>
      </div>
      {sharePhoto && (
        <div className="spPreview">
          <div className="closeBtn">
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => setSharePhoto(null)}
            />
          </div>
          <img src={sharePhoto} alt="Post" />
        </div>
      )}
    </div>
  );
};

export default SharePost;
