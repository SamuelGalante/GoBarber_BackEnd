module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'provider', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'provider');
  },
};
