const db = require("../models");

exports.get = async (req, res) => {
  try {
    const jobTitleKeyword = req.query.searchKey
    const city = req.query.city || null;
    const state = req.query.state || null;

    const result = await db.sequelize.query(
      "CALL HotSkillsByLocation (:top, :jobTitleKeyword, :city, :state)", 
      { replacements: { top: 1000, jobTitleKeyword, city, state  } }
    );    
    res.send({ message: result });
  } catch (err) {
    res.status(500).send({
      message: "Error while retrieving search results " + err,
    });
  }
};

exports.getRelevantSkillSet = async (req, res) => {
  try {
    const jobTitleName = req.query.searchKey
    const result = await db.sequelize
      .query("CALL getRelevantSkillSet (:top, :jobTitleName)", { replacements: { top: 1000, jobTitleName  } })
      console.log(result);
    res.send({
      message: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error while retrieving search results " + err,
    });
  }
};
