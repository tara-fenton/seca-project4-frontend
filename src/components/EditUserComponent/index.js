import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userLoaded: false,

      editedUserData: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        gender: ""
      },
      edited: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchUserById();
  }
  fetchUserById() {
    const { id } = this.props.match.params;
    this.setState(prevState => ({
      editedUserData: {
        ...prevState.editedUserData,
        id: Number(id)
      }
    }));

    fetch(`http://localhost:8080/api/users/${id}`)
      .then(response => response.json())
      .then(userData => {
        console.log(userData);
        this.setState({
          user: userData,
          userLoaded: true
        });
      });
  }
  onInputChange(fieldName, value) {
    this.setState((prevState, props) => {
      const editedUserData = Object.assign({}, prevState.editedUserData);
      editedUserData[fieldName] = value;
      return {
        editedUserData: editedUserData
      };
    });
  }
  onSubmit(evt) {
    evt.preventDefault();
    console.log(this.state.editedUserData);

    // fetch(`http://localhost:8080/api/users/`, {
    fetch(`http://localhost:8080/api/users/${this.state.editedUserData.id}`, {
      method: "PATCH",
      // method: "POST",
      body: JSON.stringify(this.state.editedUserData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      this.setState({
        edited: true
      })
    );
  }
  render() {
    const { edited } = this.state;
    if (edited) {
      return <Redirect to="/users" />;
    }
    return (
      <div className="main">
        <h1>Edit User</h1>
        {this.state.userLoaded ? (
          <form onSubmit={this.onSubmit} className="form">
            <label>
              First Name{" "}
              <input
                className="form-control"
                type="text"
                onChange={evt =>
                  this.onInputChange("firstName", evt.target.value)
                }
                placeholder={this.state.user.firstName}
              />
            </label>
            <label>
              Last Name{" "}
              <input
                className="form-control"
                type="text"
                onChange={evt =>
                  this.onInputChange("lastName", evt.target.value)
                }
                placeholder={this.state.user.lastName}
              />
            </label>
            <label>
              Email{" "}
              <input
                className="form-control"
                type="text"
                onChange={evt => this.onInputChange("email", evt.target.value)}
                placeholder={this.state.user.email}
              />
            </label>
            <label>
              Gender{" "}
              <input
                className="form-control"
                type="text"
                onChange={evt => this.onInputChange("gender", evt.target.value)}
                placeholder={this.state.user.gender}
              />
            </label>
            <Button type="submit" value="submit" outline color="primary" className="form-submit">
              <span className="form-submit">Submit</span>
            </Button>
          </form>
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

export default EditUserComponent;
