// Utilities
import React from 'react';
import ReactDOM from 'react-dom';

//Dumb comps
import {Jumbotron, Image, Glyphicon, Grid, Row, Col} from 'react-bootstrap';
import TabWrapper from './TabWrapper';
import SearchModal from './SearchModal';
import style from '../../sass/app.scss';

class App extends React.Component{

    render(){
      return <Grid fluid={true}>
                <Row className="show-grid">
                    <Jumbotron>
                      <Row className="show-grid">
                        <Col md={2}>
                          <Image src="images/logo.png" responsive />
                        </Col>
                        <Col md={8}>
                          <h1>Redditto</h1>
                          <p>Re-doing reddit as redditto...</p>
                        </Col>
                        <Col md={2}>
                          <SearchModal />
                        </Col>
                      </Row>
                    </Jumbotron>
                </Row>
                <Row className="show-grid">
                  <Col md={12}>
                      <TabWrapper />
                  </Col>
                </Row>
             </Grid>
    }

}


export default App;
