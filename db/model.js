const Sequelize = require('sequelize');

const sequelize = new Sequelize('connect4', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(20),
  color: Sequelize.STRING(20)
})

User.sync();

sequelize.authenticate()
  .then(() => console.log('Houston, we have a connection'))
  .catch(err => console.log(err));

module.export = User;