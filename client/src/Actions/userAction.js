import axios from "axios";

const baseUrl = "https://pandasocial.vercel.app";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      `/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    dispatch({
      type: "loginSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      error: error.response.data.error,
    });
  }
};

export const registerUser = (email, username, password) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(
      "/auth/register",
      { email, username, password },
      { withCredentials: true }
    );

    dispatch({
      type: "registerSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      error: error.response.data.error,
    });
  }
};

export const loadMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadMyProfileRequest",
    });

    const { data } = await axios.get("/user/myprofile");

    dispatch({
      type: "loadMyProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadMyProfileFailure",
      error: error.response.data.error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    await axios.put("/auth/logout");

    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      error: error.response.data.error,
    });
  }
};

export const updateProfile =
  (
    avatar,
    cover,
    email,
    name,
    livesIn,
    profession,
    worksAt,
    username,
    status
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });
      const { data } = await axios.put("/user/updateprofile", {
        name: name,
        username: username,
        email: email,
        avatar: avatar,
        cover: cover,
        status: status,
        livesIn: livesIn,
        worksAt: worksAt,
        profession: profession,
      });

      dispatch({
        type: "updateProfileSuccess",
        message: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        error: error.response.data.error,
      });
    }
  };

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userByIdRequest",
    });

    const { data } = await axios.get(`/user/${id}/profile`);

    dispatch({
      type: "userByIdSuccess",
      payload: data,
      posts: data.postsOfUser,
    });
  } catch (error) {
    dispatch({
      type: "userByIdFailure",
      error: error.response.data.error,
    });
  }
};

export const searchUsers = (query) => async (dispatch) => {
  try {
    dispatch({
      type: "searchUsersRequest",
    });

    const { data } = await axios.get(`/user/search/${query}`);

    dispatch({
      type: "searchUsersSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "searchUsersFailure",
      error: error.response.data.error,
    });
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.put(`/user/${userId}/follow`);

    dispatch({
      type: "followUserSuccess",
      message: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      error: error.response.data.error,
    });
  }
};
