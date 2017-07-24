import { combineReducers } from 'redux';

function listReducer(state = {}, action){

  switch(action.type){
    case 'LIST_IS_LOADING':
    case 'LIST_HAS_ERRORED':
    case 'LIST_FETCH_DATA_SUCCESS':
      return action.payload;
    break;
    default:
      return state;
  }

}

function search(state = {}, action){

  switch(action.type){

    case 'LIST_IS_LOADING':
    case 'LIST_HAS_ERRORED':
    case 'LIST_FETCH_DATA_SUCCESS':
      return action.payload;
    break
    case 'IS_SEARCH_ON':
      return action.payload;
    break;
    default:
      return state;
  }

}


export const rootReducer = combineReducers({
    listReducer, search
});
