const axios = require("axios");

const baseURL = `${location.origin}/api/v1`

function getUser(user) {
    const url = `${baseURL}/user/${user}`;
    axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        })
}

module.exports = {
    getUser
}