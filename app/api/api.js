const axios = require("axios");

const baseURL = `${location.origin}/api/v1`


function getDisplayTimeFromTimestamp(timestamp) {
    if (!timestamp) {
        return null;
    }
    let time = new Date(timestamp);
    let localTime = time.toLocaleTimeString();
    let timeString = localTime.split(":");
    return `${timeString[0]}:${timeString[1]} ${localTime.split(" ")[1]}`
}

function getSchedules(stationID) {
    const url = `${baseURL}/schedules/${stationID}`;
    return axios.get(url)
        .then((response) => {
            console.log(response.data);
            const schedules = response.data.map((item) => {
                const predictionAttributes = item.relationships.prediction && item.relationships.prediction.attributes;
                return {
                    ...item,
                    attributes: {
                        ...item.attributes,
                        arrival_time: getDisplayTimeFromTimestamp(item.attributes.arrival_time),
                        departure_time: getDisplayTimeFromTimestamp(item.attributes.departure_time),
                    },
                    relationships: {
                        ...item.relationships,
                        prediction: {
                            ...item.relationships.prediction,
                            attributes: predictionAttributes ? {
                                ...predictionAttributes,
                                arrival_time: getDisplayTimeFromTimestamp(predictionAttributes.arrival_time),
                                departure_time: getDisplayTimeFromTimestamp(predictionAttributes.departure_time),
                            } : null,
                        },
                    }
                }
            });
            return schedules;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}


module.exports = {
    getSchedules
}