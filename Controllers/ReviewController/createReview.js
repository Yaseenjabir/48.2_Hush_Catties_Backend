const { Review } = require("../../Models/Review");

module.exports = async function createReview(req, res) {
  try {
    const data = new Review(req.body);
    const result = await data.save();

    return res.status(201).send(result);

    res.status(200).send("Hello world");
  } catch (ex) {
    console.log(ex);
  }
};
