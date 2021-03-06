const Sequelize = require('sequelize'); 

const sequelize = require('../utils/database');

const Historytransfer = sequelize.define('historytransfer',{//definig hisotry of transfer model
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dates: {
        type: Sequelize.DATE
    },
    cash: {
        type: Sequelize.STRING
    }
});

module.exports = Historytransfer;