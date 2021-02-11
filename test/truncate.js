const db = require('../db');

module.exports = async () => {
  await db.Phone.destroy({ where: {}, force: true });
};