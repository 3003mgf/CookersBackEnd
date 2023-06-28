
require("dotenv").config();
const server = require('./app');
const { conn } = require('./src/database/sequelize.js');
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
