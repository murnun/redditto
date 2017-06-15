import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Image, Grid, Row, Col} from 'react-bootstrap';
import TabWrapper from './components/TabWrapper';
import style from '../sass/app.scss';

class App extends React.Component{

    render(){
      return <Grid fluid={true}>
                <Row className="show-grid">
                    <Jumbotron>
                      <Row className="show-grid">
                        <Col md={3}>
                          <Image src="images/logo.png" responsive />
                        </Col>
                        <Col md={9}>
                          <h1>Redditto!</h1>
                          <p>Re-doing reddit as redditto...</p>
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

ReactDOM.render(<App />, document.getElementById('app'));
