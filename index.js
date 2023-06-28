const app = require("./app");
//const port = app.get("port");
const sequelize = require("./src/database/sequelize");


const main = async() =>{
  try{
    await sequelize.sync({force: false});
    app.listen(3001, ()=>{
      console.log("Server running succesfully at port %s")
    })
  }catch(error){
    console.log("Unable to connect to the Database :(", error)
  }
};

main();