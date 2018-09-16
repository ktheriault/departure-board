import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import StationSelector from "../containers/StationSelector";
import ScheduleTable from "../containers/ScheduleTable";
import { getSchedules } from "../api/api";

import "../style/App.css"

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(async () => {
            this.props.setIsLoading(true)
            if (this.props.schedule) {
                const newSchedule = await getSchedules(this.props.selectedStation.id);
                this.props.setSchedule(newSchedule);
                this.props.setIsLoading(false);
            }
        }, 60000)
    }

    render() {
        return (
            <div className={classNames("app-container")}>
                <StationSelector/>
                <ScheduleTable/>
            </div>
        );
    }

};

App.propTypes = {
    isLoading: PropTypes.bool,
    selectedStation: PropTypes.object,
    schedule: PropTypes.array,
    setIsLoading: PropTypes.func,
    setSchedule: PropTypes.func,
}

export default App;