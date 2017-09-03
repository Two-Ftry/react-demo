/**
 * Created by jfhuang on 17/9/2.
 */

import * as actionType from '../stores/actionType';


export const setImageStateArray = (imageStateArray) => {
  return {
    type: actionType.SET_IMAGE_STATE,
    imageStateArray
  }
};

export const setImageData = (imageData) => {
  return {
    type: actionType.SET_IMAGE_DATA,
    imageData
  }
};

