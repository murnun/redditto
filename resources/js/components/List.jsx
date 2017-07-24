import React from 'react';
import { Grid, Panel, ProgressBar } from 'react-bootstrap';
import Post from './Post'

export default class List extends React.Component{

    constructor(props) {
        super(props);
        this._listPosts = this._listPosts.bind(this);
    }

    _listPosts(){

        switch(this.props.page.status){
          case 'isLoading':
            return <div>
                    <h3>Loading...</h3>
                    <ProgressBar active now={75} />
                   </div>

          case 'hasErrored':
            return <div>
                    <Panel header={<h3>Error Occurred</h3>} bsStyle="danger">
                      Unfortunately, your request didn't resolve successfully due to an error. We'll fix this!
                    </Panel>
                   </div>

          case 'success':
            return this.props.page.data.data.children.map((data, i) =>{
                return <Post post={data} key={i} />
            })
        }
    }

    render(){
      return <Grid fluid={true}>
                <div>
                  {this._listPosts()}
                </div>
            </Grid>
    }

}
