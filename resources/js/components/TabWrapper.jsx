import React from 'react';
import { Tabs, Tab, Row, Col, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import List from './List';

export default class TabWrapper extends React.Component{

    constructor(props){
      super(props);

      this.state = {
        key:'hot'
      };

      this._navigate = this._navigate.bind(this);
    }

    _navigate(e){
      this.setState({key:e});
    }

    render(){
      return <div id="tabsWrapper">
                <Tab.Container onSelect={this._navigate} defaultActiveKey={this.state.key} id="tabContainer">
                  <Row>
                    <Row>
                      <Col md={12}>
                        <Nav bsStyle="tabs" justified>
                          <NavItem eventKey="hot">
                            <Glyphicon glyph="glyphicon glyphicon-certificate" /> Hot
                          </NavItem>
                          <NavItem eventKey="new">
                            <Glyphicon glyph="glyphicon glyphicon-plus" /> New
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey={this.state.key} key={this.state.key}>
                              <List category={this.state.key} />
                            </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Row>
                </Tab.Container>
             </div>
    }

}
