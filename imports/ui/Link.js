import React from "react";
import { browserHistory } from "react-router";
import { Meteor } from 'meteor/meteor';

export default class Link extends React.Component {
    onLogout () {
        Meteor.logout();
        console.log("Logged out:", Meteor.user().emails[0].address);
        browserHistory.push("/");
    }

    render () {
        return (
            <div>
                <h1>Link page</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        );
    }
}
