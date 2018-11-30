let appConfig = {
  development: {
    host: "http://localhost:8080",
    apiServer: "http://localhost:3000",
    publicDir: "http://localhost:3000"
  },
  production: {
    host: "http://localhost:8080",
    apiServer: "http://localhost:3000",
    publicDir: "http://localhost:3000"
  }
};

module.exports = appConfig[process.env.NODE_ENV];
