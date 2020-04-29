import * as postAPI from "../api/posts";
import {
  reducerUtils,
  //createPromiseThunk,
  handleAsyncActions,
  //createPromiseThunkById,
  handleAsyncActionsById,

  createPromiseSaga,
  createPromiseSagaById
} from "../api/lib/asyncUtils";

import { takeEvery, getContext, select } from 'redux-saga/effects';

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR";

const GET_POST_BY_ID = "posts/GET_POST_BY_ID";
const GET_POST_BY_ID_SUCCESS = "posts/GET_POST_BY_ID_SUCCESS";
const GET_POST_BY_ID_ERROR = "posts/GET_POST_BY_ID_ERROR";

const GO_TO_HOME = "GO_TO_HOME";
const CLEAR_POST = "CLEAR_POST";

const PRINT_STATE = "PRINT_STATE";

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = (id) => ({
  type: GET_POST_BY_ID,
  payload: id,
  meta: id
});
export const printState = () => ({ type: PRINT_STATE});

const getPostsSaga = createPromiseSaga(GET_POSTS, postAPI.getPosts);
const getPostByIdSaga = createPromiseSagaById(GET_POST_BY_ID, postAPI.getPostById);
function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST_BY_ID, getPostByIdSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}


// function* getPostsSaga() {
//   try {
//     const posts = yield call(postAPI.getPosts);
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       payload: e,
//       error: true
//     });
//   }
// }

// function* getPostByIdSaga(action) {
//   const id = action.payload;

//   try {
//     const post = yield call(postAPI.getPostById, id);
//     yield put({
//       type: GET_POST_BY_ID_SUCCESS,
//       payload: post,
//       meta: id
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_BY_ID_ERROR,
//       payload: e,
//       error: true,
//       meta: id
//     });
//   }
// }


//export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
//export const getPostById = createPromiseThunkById(GET_POST_BY_ID, postAPI.getPostById);

export const goToHome = () => ({ type: GO_TO_HOME });
// export const goToHome = () => (dispatch, getState, {history}) => {
//   history.push('/');
// }

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
      };
    default:
      return state;
  }
}

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
