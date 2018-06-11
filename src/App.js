import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import UsersComponent from "./components/UsersComponent";
import EditUserComponent from "./components/EditUserComponent";
import AddUserComponent from "./components/AddUserComponent";

var root = "http://localhost:8080/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currentUser: null,
      pageSize: null
    };
  }
  // get the users to display in the UsersComponent
  fetchUsers() {
    fetch(`${root}/users`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users });
        console.log("this is in app "+this.state.users);
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.fetchUsers();
    console.log("this is in app "+this.state.users);
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const prevUsers = prevState.users;
  //   const newUsers = this.state.users;
  //   if (prevUsers !== newUsers) {
  //     this.fetchUsers();
  //   }
  // }

  render() {
    const Users = () => <UsersComponent users={this.state.users} />;
    const EditUser = props => (
      <EditUserComponent {...props} user={this.state.currentUser} />
    );
    const AddUser = props => <AddUserComponent />;

    return (
      <Router>
        <Switch>
          <Route exact path="/users" render={Users} />
          <Route path="/users/:id/edit" render={EditUser} />
          <Route path="/users/new" render={AddUser} />
        </Switch>
      </Router>
    );
  }
}

export default App;
