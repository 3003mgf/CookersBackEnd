const app = require("./app");
const port = app.get("port");
const sequelize = require("./src/database/sequelize");


const main = async() =>{
  try{
    await sequelize.sync({force: false});
    app.listen(port, "0.0.0.0", ()=>{
      console.log("Server running succesfully at port %s", `${port}!`)
    })
  }catch(error){
    console.log("Unable to connect to the Database :(", error)
  }
};

main();