import * as postAPI from "../api/posts";
<<<<<<< HEAD
import { reducerUtils } from "../api/lib/asyncUtils";

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";
=======
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById,
} from "../api/lib/asyncUtils";

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR";
>>>>>>> Thunk완료

const GET_POST_BY_ID = "posts/GET_POST_BY_ID";
const GET_POST_BY_ID_SUCCESS = "posts/GET_POST_BY_ID_SUCCESS";
const GET_POST_BY_ID_ERROR = "posts/GET_POST_BY_ID_ERROR";

<<<<<<< HEAD
export const getPosts = () => async (dispatch) => {
  // 요청이 시작됨
  dispatch({ type: GET_POSTS });
  // API 호출
  try {
    const posts = await postAPI.getPosts();
    // 성공시
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts,
    });
  } catch (e) {
    // 실패시
    dispatch({
      type: GET_POSTS_ERROR,
      error: e,
    });
  }
};

export const getPostById = (id) => async (dispatch) => {
  // 요청이 시작됨
  dispatch({ type: GET_POST_BY_ID });
  // API 호출
  try {
    const post = await postAPI.getPostById(id);
    // 성공시
    dispatch({
      type: GET_POST_BY_ID_SUCCESS,
      post,
    });
  } catch (e) {
    // 실패시
    dispatch({
      type: GET_POST_BY_ID_ERROR,
      error: e,
    });
  }
};

// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//};
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.posts),
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: reducerUtils.loading(),
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.post),
      };
    case GET_POST_BY_ID_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.error),
=======
const CLEAR_POST = "CLEAR_POST";

export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
export const getPostById = createPromiseThunkById(GET_POST_BY_ID, postAPI.getPostById);
export const goToHome = () => (dispatch, getState, {history}) => {
  history.push('/');
}

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);
const getPostByIdReducer = handleAsyncActionsById(GET_POST_BY_ID, "post", true);

// case1
//const getPostByIdReducer = handleAsyncActions(GET_POST_BY_ID, "post");

// case2
// const getPostByIdReducer = (state, action) => {
//   const id = action.meta;
//   switch(action.type) {
//     case GET_POST_BY_ID:
//     return {
//       ...state,
//       post: {
//         ...state.post,
//         [id]: reducerUtils.loading(state.post[id] && state.post[id].data)
//       }
//     };
//     case GET_POST_BY_ID_SUCCESS:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           [id]: reducerUtils.success(action.payload)
//         }
//       };
//     case GET_POST_BY_ID_ERROR:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           [id]: reducerUtils.error(action.payload)
//         }
//       };
//     default:
//       return state;
//   }
// }

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST_BY_ID:
    case GET_POST_BY_ID_SUCCESS:
    case GET_POST_BY_ID_ERROR:
      return getPostByIdReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
>>>>>>> Thunk완료
      };
    default:
      return state;
  }
}
<<<<<<< HEAD
=======

// export const getPosts = () => async (dispatch) => {
//   // 요청이 시작됨
//   dispatch({ type: GET_POSTS });
//   // API 호출
//   try {
//     const posts = await postAPI.getPosts();
//     // 성공시
//     dispatch({
//       type: GET_POSTS_SUCCESS,
//       posts,
//     });
//   } catch (e) {
//     // 실패시
//     dispatch({
//       type: GET_POSTS_ERROR,
//       error: e,
//     });
//   }
// };

// export const getPostById = (id) => async (dispatch) => {
//   // 요청이 시작됨
//   dispatch({ type: GET_POST_BY_ID });
//   // API 호출
//   try {
//     const post = await postAPI.getPostById(id);
//     // 성공시
//     dispatch({
//       type: GET_POST_BY_ID_SUCCESS,
//       post,
//     });
//   } catch (e) {
//     // 실패시
//     dispatch({
//       type: GET_POST_BY_ID_ERROR,
//       error: e,
//     });
//   }
// };

// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//};

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: reducerUtils.loading(),
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: reducerUtils.success(action.posts),
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: reducerUtils.error(action.error),
//       };
//     case GET_POST_BY_ID:
//       return {
//         ...state,
//         post: reducerUtils.loading(),
//       };
//     case GET_POST_BY_ID_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.post),
//       };
//     case GET_POST_BY_ID_ERROR:
//       return {
//         ...state,
//         post: reducerUtils.error(action.error),
//       };
//     default:
//       return state;
//   }
// }
>>>>>>> Thunk완료
