import axios from 'axios';
import {listLoading, listHasErrored, listFetchDataSuccess} from './list';

export function beginSearch(terms = '', state){

    return function(dispatch){

      dispatch(listLoading(true));

      let { pager: { count, dir, token } } = state;
      count = (count<25) ? 25:count;
      const pageParam = (dir != null)? `&dir=${dir}&token=${token}` : '';
      const apiURL = `/api/search?terms=${terms}&count=${count}${pageParam}`;

      axios.get(apiURL).then(res => {
          const posts = JSON.parse(res.data);
          dispatch(listFetchDataSuccess(posts));
        }).then(()=>{
          dispatch({
            type:'IS_SEARCH_ON',
            payload:{
              isSearchOn:true,
              terms
            }
          });
      }).catch(error => {
          dispatch(listHasErrored(true));
      });

    }

}
