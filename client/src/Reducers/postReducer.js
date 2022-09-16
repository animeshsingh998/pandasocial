import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const postReducer = createReducer(initialState, {
    addPostRequest : (state) => {
        state.loading = true; 
    },
    addPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    addPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
    clearPostsMessage: (state) => {
        state.message = null
    },
    clearPostsError: (state) => {
        state.error = null
    },
    getTimelineRequest: (state) => {
        state.loading = true;
    },
    getTimelineSuccess: (state, action) => {
        state.loading = false;
        state.timeline = action.payload;
    },
    getTimelineFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
    likePostRequest: (state) => {
        state.loading = true;
    },
    likePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    likePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
    myPostsRequest: (state) => {
        state.loading = true;
    },
    myPostsSuccess: (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
    },
    myPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
    delPostRequest: (state) => {
        state.loading = true;
    },
    delPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    delPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
})