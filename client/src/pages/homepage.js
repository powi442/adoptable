import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Modal from "react-bootstrap/lib/Modal";
import API from "../utils/API";
import { RecipeList, RecipeListItem } from "../components/RecipeList";
import { Container, Row, Col } from "../components/Grid";

class App extends Component {
  state = {
    pets: [],
    petSearch: ""
  };

  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    event.preventDefault();
    API.getRecipes(this.state.petSearch)
      .then(res => this.setState({ pets: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
      <div className="static-modal hidden">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
             <Col size="xs-9 sm-4">
                <Input
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  placeholder="Username"
                />
                <Input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                />
              </Col>
          </Modal.Body>

          <Modal.Footer>
            <Button>Close</Button>
            <Button bsStyle="primary">Save changes</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
        <Nav />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-0 sm-2">
                    </Col>
                    <Col size="xs-9 sm-4">
                      <Input
                        name="petSearch"
                        value={this.state.petSearch}
                        onChange={this.handleInputChange}
                        placeholder="Zip Code"
                      />
                    </Col>
                    <Col size="xs-9 sm-4">
                     <DropdownButton bsSize="large" title="Breed" id="dropdown-size-large">
                      <MenuItem eventKey="1">Chihuahua</MenuItem>
                      <MenuItem eventKey="2">Pitbull</MenuItem>
                      <MenuItem eventKey="3">Shih Tsu</MenuItem>
                      <MenuItem eventKey="4">Terrier</MenuItem>
                    </DropdownButton>
                    <DropdownButton bsSize="large" title="Gender" id="dropdown-size-large">
                      <MenuItem eventKey="1">Male</MenuItem>
                      <MenuItem eventKey="2">Female</MenuItem>
                    </DropdownButton>
                      <Button
                        bsSize="large" 
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.pets.length ? (
                <h1 className="text-center">No Pets to Display</h1>
              ) : (
                <RecipeList>
                  {this.state.pets.map(pet => {
                    return (
                      <RecipeListItem
                        key={pet.title}
                        title={pet.title}
                        href={pet.href}
                        thumbnail={pet.thumbnail}
                      />
                    );
                  })}
                </RecipeList>
              )}
            </Col>
          </Row>
        </Container>
      </div>

    ); 
  }
}

export default App;