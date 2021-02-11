module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('phones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    vendor: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('phones'),
};
