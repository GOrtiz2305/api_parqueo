module.exports = {
  HOST: "localhost",
  USER: "",
  PASSWORD: "",
  DB: "parqueo_api3",
  dialect: "mssql",
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
