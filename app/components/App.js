import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "../style/App.css"

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classNames("app-container")}>
                React is running!
            </div>
        );
    }

};

export default App;