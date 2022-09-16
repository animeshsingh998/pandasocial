import { createReducer } from "@reduxjs/toolkit";
const initialState = { isAuthenticated: false, searchActive: false };

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload;
    state.loading = false;
  },
  loginFailure: (state, action) => {
    state.error = action.error;
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
  },
  registerRequest: (state) => {
    state.loading = true;
  },
  registerSuccess: (state, action) => {
    state.user = action.payload;
    state.loading = false;
    state.isAuthenticated = true;
  },
  registerFailure: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.error = action.error;
  },
  loadMyProfileRequest: (state) => {
    state.loading = true;
  },
  loadMyProfileSuccess: (state, action) => {
    state.user = action.payload;
    state.loading = false;
    state.isAuthenticated = true;
  },
  loadMyProfileFailure: (state, action) => {
    state.error = action.error;
    state.loading = false;
    state.isAuthenticated = false;
  },
  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state) => {
    state.user = null;
    state.loading = false;
    state.isAuthenticated = false;
  },
  logoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  clearUsersError: (state) => {
    state.error = null;
  },
  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  userByIdRequest: (state) => {
    state.loading = true;
  },
  userByIdSuccess: (state, action) => {
    state.loading = false;
    state.userById = action.payload;
    state.postsOfUser = action.posts;
  },
  userByIdFailure: (state, action) => {
    state.loading = false;
    state.userByIdError = action.error;
  },
  searchUsersRequest: (state) => {
    state.loading = true;
    state.searchActive = true;
  },
  searchUsersSuccess: (state, action) => {
    state.loading = false;
    state.sResults = action.payload;
    state.searchActive = true;
  },
  searchUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.error;
    state.searchActive = false;
  },
  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },






  clearSearchActive: (state) => {
    state.searchActive = false;
    state.sResults = [];
  },
});
