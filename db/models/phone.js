module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define(
    'phones',
    {
      vendor: DataTypes.STRING,
      model: DataTypes.STRING,
      image: DataTypes.STRING,
    },
  );
  return Phone;
};
