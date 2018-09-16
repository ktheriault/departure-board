const superagent = require("superagent");
const agent = superagent.agent();

const baseURL = "https://api-v3.mbta.com";

module.exports = function(router) {

    router.get("/schedules/:stationID", (req, res) => {
        const { stationID } = req.params;
        const now = Date.now()
        const minTime = new Date(now).toTimeString().split(":");
        const minTimeString = `${minTime[0]}:${minTime[1]}`;
        const maxTime = new Date(now + 7200000).toTimeString().split(":");
        const maxTimeString = `${maxTime[0]}:${maxTime[1]}`;
        const url = `${baseURL}/schedules?include=trip,prediction&sort=arrival_time&filter[min_time]=${minTimeString}&filter[max_time]=${maxTimeString}&filter[stop]=${stationID}`;
        console.log();
        console.log(url);
        console.log();
        agent.get(url)
            .end((scheduleError, scheduleResponse) => {
                if (scheduleError) {
                    res.status(500).send(scheduleError);
                } else {
                    console.log();
                    console.log(scheduleResponse.body.data);
                    console.log();
                    const rawSchedules = scheduleResponse.body.data;
                    const crSchedules = rawSchedules.filter((item) => {
                        return item.relationships.route.data.id.slice(0,3) === "CR-"
                    })
                    const tripIDs = crSchedules.map((item) => {
                        return item.relationships.trip.data.id;
                    }).join(",");
                    const tripsURL = `${baseURL}/trips?filter[id]=${tripIDs}`;
                    agent.get(tripsURL)
                        .end((tripsError, tripsResponse) => {
                            if (tripsError) {
                                res.status(500).send(tripsError);
                            } else {
                                console.log();
                                console.log(tripsResponse.body.data);
                                console.log();
                                const trips = tripsResponse.body.data
                                let tripsDict = {};
                                trips.forEach((trip) => {
                                    tripsDict[trip.id] = trip;
                                });
                                const schedulesWithTrips = crSchedules.map((item) => {
                                    return {
                                        ...item,
                                        relationships: {
                                            ...item.relationships,
                                            trip: {
                                                data: tripsDict[item.relationships.trip.data.id],
                                            }
                                        }
                                    }
                                }).filter((item) => {
                                    return item.relationships.trip.data.attributes.direction_id === 0;
                                })

                                const predictionsURL = `${baseURL}/predictions?filter[stop]=${stationID}`;
                                agent.get(predictionsURL)
                                    .end((predictionsError, predictionsResponse) => {
                                        if (predictionsError) {
                                            res.status(500).send(predictionsError)
                                        } else {
                                            const predictions = predictionsResponse.body.data;
                                            const predictionsDict = {}
                                            predictions.forEach((prediction) => {
                                                predictionsDict[prediction.id] = prediction;
                                            });
                                            const schedulesWithTripsAndPredictions = schedulesWithTrips.map((item) => {
                                                const prediction = item.relationships.prediction && item.relationships.prediction.data;
                                                return {
                                                    ...item,
                                                    relationships: {
                                                        ...item.relationships,
                                                        prediction: prediction ? predictionsDict[prediction.id] : null,
                                                    }
                                                }
                                            })
                                            res.status(200).send(schedulesWithTripsAndPredictions)
                                        }
                                        
                                    });
                            }
                        })
                }
            });
    })

}