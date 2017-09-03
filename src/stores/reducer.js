/**
 * Created by jfhuang on 17/9/2.
 */

import { combineReducers } from 'redux';
import * as actionType from '../stores/actionType'
// const SET_IMAGE_STATE = 'set_image_state';

function imageStateArray(state = [], action) {
  switch (action.type) {
    case actionType.SET_IMAGE_STATE:
      state = action.imageStateArray;
      break;
  }
  return state;
}

function imageData(state = [], action) {
  switch (action.type) {
    case actionType.SET_IMAGE_DATA:
      state = action.imageData;
      break;
  }
  return state;
}

const reducer = combineReducers({
  imageStateArray,
  imageData
})

export default reducer;
