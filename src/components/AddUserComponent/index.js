import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

class AddUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null,
      // userLoaded: false,

      user: {
        firstName: "",
        lastName: "test",
        email: "test",
        gender: "test"
      },
      created: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //this.fetchUserById();
  }
  // fetchUserById() {
  //   const { id } = this.props.match.params;
  //   this.setState(prevState => ({
  //     user: {
  //       ...prevState.user,
  //       id: Number(id)
  //     }
  //   }));
  //
  //   fetch(`http://localhost:8080/api/users/${id}`)
  //     .then(response => response.json())
  //     .then(userData => {
  //       console.log(userData);
  //       this.setState({
  //         user: userData,
  //         userLoaded: true
  //       });
  //     });
  // }
  onInputChange(fieldName, value) {
    this.setState((prevState, props) => {
      const user = Object.assign({}, prevState.user);
      user[fieldName] = value;
      return {
        user: user
      };
    });
  }
  onSubmit(evt) {
    evt.preventDefault();
    // console.log(this.state.user);

    fetch(`http://localhost:8080/api/users/`, {
      // fetch(`http://localhost:8080/api/users/${this.state.user.id}`, {
      // method: "PATCH",
      method: "POST",
      body: JSON.stringify(this.state.user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      this.setState({
        created: true
      })
    );
  }
  render() {
    const { created } = this.state;
    if (created) {
      return <Redirect to="/users" />;
    }

    return (
      <div className="main">
        <h1>Add New User</h1>
        <form onSubmit={this.onSubmit} className="form">
          <label>
            First Name{" "}
            <input
              className="form-control"
              type="text"
              onChange={evt =>
                this.onInputChange("firstName", evt.target.value)
              }
              placeholder="First Name"
            />
          </label>
          <label>
            Last Name{" "}
            <input
              className="form-control"
              type="text"
              onChange={evt => this.onInputChange("lastName", evt.target.value)}
              placeholder="Last Name"
            />
          </label>
          <label>
            Email{" "}
            <input
              className="form-control"
              type="text"
              onChange={evt => this.onInputChange("email", evt.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            Gender{" "}
            <input
              className="form-control"
              type="text"
              onChange={evt => this.onInputChange("gender", evt.target.value)}
              placeholder="Gender"
            />
          </label>
          <Button type="submit" value="submit" outline color="primary" className="form-submit">
            <span className="form-submit">Submit</span>
          </Button>
        </form>
      </div>
    );
  }
}

export default AddUserComponent;
