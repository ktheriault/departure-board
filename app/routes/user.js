const superagent = require("superagent");
const agent = superagent.agent();

const baseURL = "https://users.com";

module.exports = function(router) {

    router.post("/user", (req, res) => {
        const { user } = req.body;
        const url = `${baseURL}/create`;
        agent.post(url)
            .send(user)
            .end((err, response) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(response);
                }
            });
    })

    router.get("/user", (req, res) => {
        const { user } = req.params;
        const url = `${baseURL}/get/${user}`;
        agent.get(url)
            .end((err, response) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(response);
                }
            });
    })

}