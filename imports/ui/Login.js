import React from "react";
import { Link, browserHistory } from "react-router";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ""
    }
  }


  onSubmit (e) {
    e.preventDefault();
    let email = this.refs.email.value.trim()
    ,   password = this.refs.email.value.trim()
    ;

    Meteor.loginWithPassword(email, password, (err) => {
      if (!err) {
        console.log("Signed in:", email);
        this.setState({ error: "" });
        browserHistory.push("/links");

      } else {
        console.log(err);
        this.setState({ error: err.reason });
      }
    })
  }


  render () {
    return (
      <div>
        <h1>Login to Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Enter your email address" />
          <input type="password" ref="password" name="password" placeholder="Enter a password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Don't have an account?</Link>
      </div>
    );
  }
}
