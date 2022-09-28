import axios from "axios";

const baseUrl = "https://apipandasocial.onrender.com";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      `${baseUrl}/auth/login`,
      { email, password },
      { headers },
      { withCredentials: true }
    );
    console.log(data.token);
    document.cookie = `jwt = ${data.token}`
    window.localStorage.setItem("jet", data.token);

    dispatch({
      type: "loginSuccess",
      payload: data.otherDetails,
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
      `${baseUrl}/auth/register`,
      { email, username, password },
      { headers },
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

    const { data } = await axios.get(`${baseUrl}/user/myprofile`, { 
      headers: headers
     });

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
    await axios.put(`${baseUrl}/auth/logout`, {
      headers,
    });

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
      const { data } = await axios.put(
        `${baseUrl}/user/updateprofile`,
        {
          name: name,
          username: username,
          email: email,
          avatar: avatar,
          cover: cover,
          status: status,
          livesIn: livesIn,
          worksAt: worksAt,
          profession: profession,
        },
        { headers }
      );

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

    const { data } = await axios.get(`${baseUrl}/user/${id}/profile`, {
      headers,
    });

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

    const { data } = await axios.get(`${baseUrl}/user/search/${query}`, {
      headers,
    });

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

    const { data } = await axios.put(`${baseUrl}/user/${userId}/follow`, {
      headers,
    });

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
