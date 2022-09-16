import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { postReducer } from "./Reducers/postReducer";

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
    }
})

export default store;