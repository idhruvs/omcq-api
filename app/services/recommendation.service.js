const fetch = require("node-fetch");
const constants = require("../../constants").common;
module.exports = {
  generate: async userInfo => {
    let userData = {};
    let dataset = [];
    const headers = {
      "X-Parse-Application-Id": "IphrIhDKCf8buyK4acb0pRZF54vcJHzLc7NGOPg3",
      "X-Parse-REST-API-Key": "TZLCmxRmCN3US6OV8KCQrpswmBbTiwxquX3tw5i0"
    };
    console.log("Fetching info for: ", userInfo);
    fetch(constants.host + constants.apis.responses, {
      method: "GET",
      headers: headers,
      params: { userId: userInfo, order: "-createdAt" }
    })
      .then(res => res.json())
      .then(res => {
        userData = res.results[0];
        fetch(constants.host + constants.apis.dataset, {
          method: "GET",
          headers: headers,
          params: { order: "-createdAt" }
        })
          .then(res => res.json())
          .then(res => {
            dataset = res.results;
            let recommendations = computeSimilarities(userData, dataset);
            let recommendationObject = {
              userId: userInfo,
              recommendation1: recommendations[0].profession,
              recommendation2: recommendations[1].profession,
              recommendation3: recommendations[2].profession,
              recommendation4: recommendations[3].profession,
              recommendation5: recommendations[4].profession
            };
            console.log(recommendationObject);
            fetch(constants.host + constants.apis.recommendations, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(recommendationObject)
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                return res;
              });
          });
      });
  }
};

const computeSimilarities = (userData, dataset) => {
  console.log(userData);
  console.log(dataset);
  let scoreMatrix = [];
  const keys = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];

  dataset.filter(data => {
    let score = 0;
    keys.filter(key => {
      if (
        userData[`${key}`].toString().toLowerCase() ===
        data[key].toString().toLowerCase()
      ) {
        score++;
      }
    });
    scoreMatrix.push({ profession: data.profession, score });
  });
  return generateRanking(scoreMatrix);
};

const generateRanking = scoreMatrix => {
  var byScore = scoreMatrix.slice(0);
  byScore.sort(function(a, b) {
    return b.score - a.score;
  });
  return byScore;
};
