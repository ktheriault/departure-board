import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DropdownButton, MenuItem } from "react-bootstrap";

import { getSchedules } from "../api/api";

const stations = [
    { id: "place-north", name: "North Station" },
    { id: "place-sstat", name: "South Station" },
];

const StationSelector = (props) => {

    const getOnStationSelectHandler = (i) => {
        return async () => {
            const selectedStation = stations[i]
            props.setIsLoading(true);
            props.setSelectedStation(selectedStation);
            const schedule = await getSchedules(selectedStation.id);
            props.setSchedule(schedule);
            props.setIsLoading(false);
        }
    }

    return (
        <div className={classNames("station-selector-container")}>
            <DropdownButton
                id={"stop-selector"}
                title={props.selectedStation ? props.selectedStation.name : "Select Station"}
            >
                {stations.map((station, i) => {
                    return (
                        <MenuItem
                            key={station.id}
                            eventKey={i}
                            onSelect={getOnStationSelectHandler(i)}
                        >
                            {station.name}
                        </MenuItem>
                    )
                })}
            </DropdownButton>
        </div>
    );

};

StationSelector.propTypes = {
    isLoading: PropTypes.bool,
    selectedStation: PropTypes.object,
    setIsLoading: PropTypes.func,
    setSelectedStation: PropTypes.func,
    setSchedule: PropTypes.func,
}

export default StationSelector;