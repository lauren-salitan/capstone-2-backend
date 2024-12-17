const { sequelize } = require("./backend/models");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const users = await sequelize.models.User.findAll();
    console.log("Users:", users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
