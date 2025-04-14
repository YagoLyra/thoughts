const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thoughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conexão com o banco de dados realizada com sucesso!");
} catch (error) {
  console.error("Não foi possível conectar ao banco de dados:", error);
}

module.exports = sequelize;
