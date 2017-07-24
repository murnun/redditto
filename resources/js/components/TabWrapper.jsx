//Utilities
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadList } from '../actions/list.js';
import { beginSearch } from '../actions/search.js';

// Dumb comps
import { Tabs, Tab, Row, Col, Nav, NavItem, Glyphicon, Pager } from 'react-bootstrap';
import List from './List';
import ReddittoNav from './ReddittoNav';

class TabWrapper extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          page:'hot',
          isSearchOn: false,
          terms: null,
          pager:{
              count:25,
              dir: null,
              token: null
          }
        };

        this._navigate = this._navigate.bind(this);
        this._paginate = this._paginate.bind(this);
    }

    _navigate(e){

        this.setState({
            page:e,
            pager:{
              count:25,
              dir:null,
              token: null
            }
        }, ()=> {
            this.props.loadList(this.state);
        });
    }

    _paginate(e){

        const count = (e=='before')? this.state.pager.count-25 : this.state.pager.count+25,
              page  = this.state.page,
              dir   = e,
              token = this.props.content.data.data[e];

        this.setState({
            page: page,
            pager:{
              count,
              dir,
              token
            }
        }, ()=>{
            if(this.state.isSearchOn)
              this.props.beginSearch(this.state.terms, this.state);
            else
              this.props.loadList(this.state);
        });
    }

    componentDidMount(){
        this.props.loadList(this.state);
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.isSearchOn) !== JSON.stringify(nextProps.isSearchOn)){
          this.setState({
            isSearchOn: nextProps.isSearchOn,
            terms: nextProps.terms,
            page: 'search'
          });
        }
    }

    render(){
      return <div id="tabsWrapper">
                <Tab.Container onSelect={this._navigate} defaultActiveKey={this.state.page} id="tabContainer" activeKey={this.state.page}>
                  <div>
                    <Row>
                      <Col md={12}>
                        <ReddittoNav isSearchOn={this.state.isSearchOn} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey={this.state.page}>
                              <List page={this.props.content} />
                              <Pager onSelect={this._paginate}>
                                <Pager.Item eventKey='before' previous href="#">&larr; Previous Page</Pager.Item>
                                <Pager.Item eventKey='after' next href="#">Next Page &rarr;</Pager.Item>
                              </Pager>
                            </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </div>
                </Tab.Container>
             </div>
    }

}

function mapStateToProps(state){

  return {
    isSearchOn: state.search.isSearchOn,
    terms: state.search.terms,
    content: state.listReducer,
  }
}

function mapDispatchToProps(dispatch){

  return {
    loadList: function(state){
        dispatch(loadList(state));
    },
    beginSearch: function(terms, state){
        dispatch(beginSearch(terms, state));
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TabWrapper);
