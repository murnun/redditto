import React from 'react';
import {  Nav, NavItem, Glyphicon } from 'react-bootstrap';

class ReddittoNav extends React.Component{

    constructor(props){
      super(props);
    }

    render(){

        let searchTab = null;

        if(this.props.isSearchOn){
          searchTab = <NavItem eventKey="search">
            <Glyphicon glyph="glyphicon glyphicon-plus" /> Results
          </NavItem>;
        }

        return <Nav bsStyle="tabs" justified>
          <NavItem eventKey="hot">
            <Glyphicon glyph="glyphicon glyphicon-certificate" /> Hot
          </NavItem>
          <NavItem eventKey="new">
            <Glyphicon glyph="glyphicon glyphicon-plus" /> New
          </NavItem>
          {searchTab}
        </Nav>


    }

}

export default ReddittoNav;
