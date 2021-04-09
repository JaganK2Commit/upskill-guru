const db = require("../models");

exports.get = async (req, res) => {
  try {
    const jobTitleKeyword = req.query.searchKey
    const result = await db.sequelize
      .query("CALL HotSkillsByLocation (:top, :jobTitleKeyword)", { replacements: { top: 10, jobTitleKeyword  } })
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
