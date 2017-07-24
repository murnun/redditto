import axios from 'axios';

export function listLoading(bool){
  return {
    type: 'LIST_IS_LOADING',
    payload:{
      status: 'isLoading'
    }
  }
}

export function listHasErrored(error){
  return {
    type: 'LIST_HAS_ERRORED',
    payload:{
      status: 'hasErrored',
      error
    }
  }
}

export function listFetchDataSuccess(data){
  return {
    type: 'LIST_FETCH_DATA_SUCCESS',
    payload:{
      status: 'success',
      data
    }
  }
}

export function loadList(state){

    return function(dispatch){

      dispatch(listLoading(true));

      let { page, pager: { count, dir, token } } = state;
      count = (count<25) ? 25:count;
      const pageParam = (dir != null)? `&dir=${dir}&token=${token}` : '';
      const apiURL = `/api/${page}?count=${count}${pageParam}`;

      axios.get(apiURL, {}).then(res => {
          const posts = JSON.parse(res.data);
          dispatch(listFetchDataSuccess(posts));
      }).catch(error => {
          dispatch(listHasErrored(error));
      });

    }

}
