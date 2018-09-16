import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Table } from "react-bootstrap";

const ScheduleTable = (props) => {

    return props.schedule ? (
        <div className={classNames("schedule-table-container")}>
            {props.schedule.length > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Carrier</th>
                            <th>Time</th>
                            <th>Destination</th>
                            <th>Train#</th>
                            <th>Track#</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.schedule.map((item, i) => {
                            let predictionAttributes = item.relationships.prediction && item.relationships.prediction.attributes;
                            const predictionDisplay = predictionAttributes ? predictionAttributes.departure_time : "On Time";
                            return (
                                <tr key={i}>
                                    <td>MBTA</td>
                                    <td>{item.attributes.arrival_time}</td>
                                    <td>{item.relationships.trip.data.attributes.headsign}</td>
                                    <td>{item.relationships.trip.data.attributes.name}</td>
                                    <td>TBD</td>
                                    <td>{predictionDisplay}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            ) : (
                <div className={classNames("empty-schedule")}>
                    No trains scheduled for the next two hours
                </div>
            )}
        </div>
    ) : null;
};

ScheduleTable.propTypes = {
    isLoading: PropTypes.bool,
    selectedStation: PropTypes.object,
    schedule: PropTypes.array,
    setIsLoading: PropTypes.func,
}

export default ScheduleTable;