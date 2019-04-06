const recommendationService = require("../services/recommendation.service");

module.exports = {
  get: (req, res) => {
    console.log(req);
    res.status(200).send({ status: "working" });
  },
  generate: (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    const response = recommendationService.generate(username);
    res.status(200).send({ status: "successfull", response });
  }
};
