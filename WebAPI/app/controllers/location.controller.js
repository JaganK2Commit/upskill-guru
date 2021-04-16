const db = require("../models");
const { Op } = require("sequelize");

exports.find = async (req, res) => {
  try {
    const locationKeyword = req.query.searchKey;
    const limit = +(req.query.limit);
    const result = await db.locations.findAll({
      attributes: ['city', 'state'],
      where: {
        city: {
          [Op.like]: locationKeyword + '%'
        }
      },
      limit: limit,
      group: ['state', 'city']
    });
    // console.log("result: " + result);
    res.send({
      message: result,
    });
  } catch (err) {
    console.log("Error while retrieving search results " + err);
    res.status(500).send({
      message: "Error while retrieving search results " + err,
    });
  }
};
