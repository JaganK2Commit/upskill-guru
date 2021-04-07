const db = require("../models");

exports.get = async (req, res) => {
  try {
    const result = await db.sequelize
      .query("CALL HotSkillsByLocation (:top)", { replacements: { top: 20 } })
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
