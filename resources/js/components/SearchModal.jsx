import React from 'react';
import { connect } from 'react-redux';
import { beginSearch } from '../actions/search';
import { Button, Modal, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

class SearchModal extends React.Component{

    constructor(props){

        super(props);

        this.state = {
          showModal:false,
          searchVal:''
        };

        this._open = this._open.bind(this);
        this._close = this._close.bind(this);
        this._search = this._search.bind(this);
        this._updateSearchVal = this._updateSearchVal.bind(this);
    }

    _open(){
        this.setState({showModal:true});
    }

    _close(){
        this.setState({
          showModal:false,
          searchVal:''
        });
    }

    _search(){
        this.setState({
          showModal:false,
          searchVal:''
        });

        console.log('searching...');
        this.props.dispatch(beginSearch(this.state.searchVal, {pager:{ count:25}}));
    }

    _updateSearchVal(e){
        this.setState({
          searchVal: e.target.value
        });
    }

    render(){
        return <div id="searchModal">
                  <Button bsStyle="primary" bsSize="large" onClick={this._open}>
                    <Glyphicon glyph="glyphicon glyphicon-search" /> Search
                  </Button>
                  <Modal show={this.state.showModal} onHide={this._close}>
                    <Modal.Body>
                      <FormGroup>
                        <InputGroup>
                          <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-search" /></InputGroup.Addon>
                          <FormControl type="text" placeholder="search here..." value={this.state.searchVal}
                              onChange={e => this._updateSearchVal(e)} autoFocus />
                          <InputGroup.Button>
                            <Button onClick={this._search}>Search</Button>
                          </InputGroup.Button>
                        </InputGroup>
                      </FormGroup>
                    </Modal.Body>
                  </Modal>
               </div>
    }

}

export default connect()(SearchModal);
