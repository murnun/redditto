import React from 'react';
import { Grid, Pager } from 'react-bootstrap';
import Post from './Post'
import axios from 'axios';

export default class List extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
          posts: [],
          pager: {
            count:25,
            before: null,
            after: null
          }
        };

        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        this._listPosts = this._listPosts.bind(this);
        this._paginate = this._paginate.bind(this);
        this._fetch = this._fetch.bind(this);

    }

    componentDidMount(){
        const count = this.state.pager.count,
              dir   = null,
              token = null;

        this._fetch(count, dir, token);
    }

    componentWillUnMount(){
        this.source.cancel('Operation canceled by the user.');
    }

    _fetch(count, dir, token){

      const pageParam = (dir != null)? `/${dir}/${token}` : '';
      const apiURL = `/api/${this.props.category}/${count}${pageParam}`;

      axios.get(apiURL, {
          cancelToken: this.source.token
      }).then(res => {

          const posts = JSON.parse(res.data);
          console.log(posts);

          this.setState({
            posts: posts.data.children,
            pager: {
                count: count,
                before: posts.data.before,
                after: posts.data.after
            }
          });

        }).catch(error => {
            console.log(error);
        });
    }

    _paginate(e){
        const count = (e=='before')? this.state.pager.count-25 : this.state.pager.count+25,
              dir   = e,
              token = this.state.pager[e];
        this._fetch(count, dir, token);
    }

    _listPosts(){
      return this.state.posts.map((data, i) =>{
          return <Post post={data} key={i} />
      })
    }
    render(){
      return <Grid fluid={true}>
                <div>
                  {this._listPosts()}
                </div>
                <Pager onSelect={this._paginate}>
                  <Pager.Item eventKey='before' previous href="#">&larr; Previous Page</Pager.Item>
                  <Pager.Item eventKey='after' next href="#">Next Page &rarr;</Pager.Item>
                </Pager>
            </Grid>
    }

}
