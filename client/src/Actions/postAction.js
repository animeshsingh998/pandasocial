import axios from 'axios';

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const addPost = (desc, image) => async (dispatch) => {
    try {
        dispatch({
            type: "addPostRequest"
        });

        const { data } = await axios.post(
          "https://apipandasocial.vercel.app/post/create",
          {
            desc,
            image,
            },
          {headers}
        );

        dispatch({
            type: "addPostSuccess",
            message: data.message
        })
    } catch (error) {
        dispatch({
            type: "addPostFailure",
            error: error.response.data.error
        })
    }
}

export const getTimeline = () => async (dispatch) => {
    try {
        dispatch({
            type: "getTimelineRequest"
        });

        const { data } = await axios.get(
            "https://apipandasocial.vercel.app/post/timeline",
            {headers}
        );

        dispatch({
            type: "getTimelineSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getTimelineFailure",
            error: error.response.data.error
        });
    }
}

export const likeDislikePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likePostRequest"
        });

        const { data } = await axios.put(
            `https://apipandasocial.vercel.app/post/${id}/like`,
            {headers}
        );

        dispatch({
            type: "likePostSuccess",
            message: data.message
        })
    } catch (error) {
        dispatch({
            type: "likePostFailure",
            error: error.response.data.error
        })
    }
}

export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest"
        });

        const { data } = await axios.get(
            "https://apipandasocial.vercel.app/post/myposts",
            {headers}
        );

        dispatch({
            type: "myPostsSuccess",
            payload: data.posts
        });
    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            error: error.response.data.error
        })
    }
}

export const delPost = (postId) => async (dispatch) => {
    try {
      dispatch({
        type: "delPostRequest",
      });

      const { data } = await axios.delete(
          `https://apipandasocial.vercel.app/post/${postId}/delete`,
          {headers}
      );

      dispatch({
        type: "delPostSuccess",
        message: data.message,
      });
    } catch (error) {
      dispatch({
        type: "delPostFailure",
        error: error.response.data.error,
      });
    }
}