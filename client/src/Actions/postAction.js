import axios from 'axios';

export const addPost = (desc, image) => async (dispatch) => {
    try {
        dispatch({
            type: "addPostRequest"
        });

        const { data } = await axios.post('/post/create', {
            desc,
            image
        });

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

        const { data } = await axios.get('/post/timeline');

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

        const { data } = await axios.put(`post/${id}/like`);

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

        const { data } = await axios.get('/post/myposts');

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

      const { data } = await axios.delete(`/post/${postId}/delete`);

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