import { CreateOutlined } from "@mui/icons-material";
import "./ProfileInfoCard.css";
import loader from "../../assets/images/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUserById,
  loadMyProfile,
  logoutUser,
  updateProfile,
} from "../../Actions/userAction";
import { useState } from "react";
import { Dialog } from "@mui/material";
import noCover from "../../assets/images/nocover.jpg";
import noProfile from "../../assets/images/noprofile.jpg";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = ({ profile = true }) => {
  const token = window.localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [avatarPrev, setAvatarPrev] = useState(null);
  const [coverPrev, setCoverPrev] = useState(null);
  const [avatarCh, setAvatarCh] = useState(false);
  const [coverCh, setCoverCh] = useState(false);
  const { user, loading, userById } = useSelector((state) => state.users);
  const [isFollow, setIsFollow] = useState(false);
  const [userData, setUserData] = useState({
    avatar: null,
    cover: null,
    name: user.name,
    username: user.username,
    email: user.email,
    status: user.status,
    livesIn: user.livesIn,
    worksAt: user.worksAt,
    profession: user.profession,
  });
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser(token));
    navigate("/");
  };
  const handleImg = (e) => {
    const imageRaw = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(imageRaw);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setUserData({ ...userData, [e.target.name]: Reader.result });
        if (e.target.name === "cover") {
          setCoverPrev(Reader.result);
        } else {
          setAvatarPrev(Reader.result);
        }
      }
    };
  };
  const coverVal = coverPrev ? coverPrev : user.cover[0].url;
  const avatarVal = avatarPrev ? avatarPrev : user.avatar[0].url;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateProfile(
        avatarCh ? userData.avatar : null,
        coverCh ? userData.cover : null,
        userData.email,
        userData.name,
        userData.livesIn,
        userData.profession,
        userData.worksAt,
        userData.username,
        userData.status,
        token
      )
    );
    dispatch(loadMyProfile(token));
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    if (userData.email.length < 1 || userData.username.length < 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [userData.email, userData.username, valid]);
  useEffect(() => {
    avatarPrev && setAvatarCh(true);
    coverPrev && setCoverCh(true);
  }, [avatarPrev, coverPrev]);

  const handleFollow = async (e) => {
    e.preventDefault();
    await dispatch(followUser(userById._id, token));
    await dispatch(getUserById(userById._id, token));
    dispatch(loadMyProfile(token));
  };

  useEffect(() => {
    if ((userById && user.following.includes(userById._id)) || false) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [isFollow, user.following, userById]);
  return (
    <div className="ProfileInfoCard">
      <div className="picTop">
        <span>{profile ? "Your Info" : "Their Info"}</span>
        {profile && (
          <CreateOutlined
            onClick={() => setOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className="picMid">
        <div className="picMidInfo">
          <span>Status</span>
          {profile ? (
            <span>{user.status ? user.status : "not Set"}</span>
          ) : (
            <span>
              {userById && userById.status ? userById.status : "not Set"}
            </span>
          )}
        </div>
        <div className="picMidInfo">
          <span>Name</span>
          {profile ? (
            <span>{user.name ? user.name : "not Set"}</span>
          ) : (
            <span>{userById && userById.name ? userById.name : "not Set"}</span>
          )}
        </div>
        <div className="picMidInfo">
          <span>Lives in</span>
          {profile ? (
            <span>{user.livesIn ? user.livesIn : "not Set"}</span>
          ) : (
            <span>
              {userById && userById.livesIn ? userById.livesIn : "not Set"}
            </span>
          )}
        </div>
        <div className="picMidInfo">
          <span>Works at</span>
          {profile ? (
            <span>{user.worksAt ? user.worksAt : "not Set"}</span>
          ) : (
            <span>
              {userById && userById.worksAt ? userById.worksAt : "not Set"}
            </span>
          )}
        </div>
      </div>
      <div className="picBot">
        {profile ? (
          <button className="btn logout-btn" onClick={handleLogout}>
            {loading ? (
              <img src={loader} alt="loading.." className="loaderBtn" />
            ) : (
              "Logout"
            )}
          </button>
        ) : (
          <button
            className="flw-btn"
            style={{
              backgroundColor: isFollow ? "red" : "",
              color: isFollow ? "white" : "",
              display: userById && user._id === userById._id ? "none" : "",
            }}
            onClick={handleFollow}
          >
            {loading ? (
              <img src={loader} alt="loading.." className="loaderBtn" />
            ) : isFollow ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </button>
        )}
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
      >
        <form className="dialogBox" onSubmit={handleSubmit}>
          <div className="updCover">
            <img src={coverVal ? coverVal : noCover} alt="Cover Pic" />
            <input
              type="file"
              name="cover"
              id="cover"
              style={{ display: "none" }}
              onChange={handleImg}
            />
            <label htmlFor="cover" className="imglabel">
              Choose Cover Image <AddPhotoAlternate />
            </label>
          </div>
          <div className="updAvatar">
            <img src={avatarVal ? avatarVal : noProfile} alt="Avatar Pic" />
            <input
              type="file"
              name="avatar"
              id="avatar"
              style={{ display: "none" }}
              onChange={handleImg}
            />
            <label htmlFor="avatar" className="imglabel">
              Choose Avatar Image <AddPhotoAlternate />
            </label>
          </div>
          <hr />
          <div className="inpField">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={handleChange} />
          </div>
          <div className="inpField">
            <label htmlFor="username">Username: (*required)</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="inpField">
            <label htmlFor="email">Email: (*required)</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="inpField">
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              name="status"
              id="status"
              onChange={handleChange}
            />
          </div>
          <div className="inpField">
            <label htmlFor="livesIn">City:</label>
            <input
              type="text"
              name="livesIn"
              id="livesIn"
              onChange={handleChange}
            />
          </div>
          <div className="inpField">
            <label htmlFor="worksAt">Working At:</label>
            <input
              type="text"
              name="worksAt"
              id="worksAt"
              onChange={handleChange}
            />
          </div>
          <div className="inpField">
            <label htmlFor="profession">profession:</label>
            <input
              type="text"
              name="profession"
              id="profession"
              onChange={handleChange}
            />
          </div>
          <div className="upd-btns">
            <span
              className="btn can-btn"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Cancel
            </span>
            <button
              className="btn upd-btn"
              type="submit"
              disabled={valid || loading}
            >
              {loading ? (
                <img src={loader} alt="loading.." className="loaderBtn" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfileInfoCard;
