import axios from 'axios';
// Action creators

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function searchAction(terms = ''){

    return function(dispatch, getState){

      console.log(dispatch);

      return {
        type: 'BEGIN_SEARCH',
        payload: {
            isSearchOn: true,
            terms
        }
      };
    }
}
