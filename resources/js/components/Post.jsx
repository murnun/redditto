import React from 'react';
import { Media, Thumbnail, Glyphicon } from 'react-bootstrap';

export default class Post extends React.Component{

    constructor(props){
      super(props);
      this._postTemplate = this._postTemplate.bind(this);
    }

    _postTemplate(data){
      const post = data.post.data;

      //if thumbnails come in as one of below, no thumbnails rendered
      const defaults = ['default', 'self', 'image', 'nsfw', 'spoiler'];

      return <Media>
                {(defaults.indexOf(post.thumbnail)==-1) && <Media.Left align="top">
                  <img width={post.thumbnail_width/2} height={post.thumbnail_height/2} src={post.thumbnail} alt="Image"/>
                </Media.Left>}
                <Media.Body>
                  <a href={post.url}>
                    <Media.Heading>{post.title}</Media.Heading>
                  </a>
                  <p>by {post.author}</p>
                </Media.Body>
              </Media>
    }

    render(){
      return <div className="post">
                {this._postTemplate(this.props)}
             </div>
    }

}
