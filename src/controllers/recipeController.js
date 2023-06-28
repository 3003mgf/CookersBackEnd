const recipeController = () =>{};
const axios = require("axios");
const {Recipes} = require("../database/sequelize");
const { Op } = require("sequelize");

require("dotenv").config();
const { MY_API } = process.env;



recipeController.getAllRecipes = async(req, res) =>{
  
  // const { page = 0, size = 9 } = req.query;
  // let options = {
  //   limit: Number(size),
  //   offset: Number(page) * Number(size),
  //   order:[["name", "ASC"]]
  // }
  try{
    const getRecipes = await Recipes.findAll({
      order:[["name", "ASC"]]
    });

    res.json(getRecipes);
  }catch(error){
    console.log(error);
  }
};

recipeController.getOneRecipe = async(req, res) =>{
  const { id } = req.params;
  
  try{
    const getRecipe = await Recipes.findAll({where: id});
    console.log(getRecipe)
    res.json(getRecipe);
  }catch(error){
    console.log(error);
  }
};

recipeController.getByName = async(req, res) =>{
  try{
    if(!req.query.name) return res.json("Only Name query is accepted");
    const { name } = req.query;
    const getRecipes = await Recipes.findAll();
    
    if(name.split(" ").length === 1){
      let recipesFound = [];
      for(let i = 0; i < getRecipes.length; i++){
        let title = getRecipes[i].name;
        let titleArray = title.split(",").join("");
        let titleArray2 = titleArray.split(" ");

        titleArray2.map(el => {
          if(el.toLowerCase() === name.toLowerCase()){
            recipesFound.push(getRecipes[i])
          }
        })
      }
      res.json(recipesFound);
    }else{
      let recipesFound = [];
      for(let i = 0; i < getRecipes.length; i++){

        let title = getRecipes[i].name;

        let t2 = title.split(",").join("");


        let string = name;

        let s2 = string.split(",").join("");

        let s2Array = s2.split(" ");
        let t2Array = t2.split(" ");
        let t3Array = t2Array.toString().toLowerCase().split(",");
        let info = [];

        s2Array.map(el => {
          if(t3Array.includes(el.toLowerCase())){
            info.push(el)
          }
        });

        if(info.length === s2Array.length){
          recipesFound.push(getRecipes[i]);
        }

      };
      
      res.json(recipesFound);
    }
  }catch(error){
    console.log(error);
  }
};

recipeController.getRecipesSortedByName  = async(req, res)=>{
  const { sort } = req.params;
  try{
    if(sort === "asc"){
      const getRecipes = await Recipes.findAll({
        order: [
          ['name', 'ASC'],
        ]
      });
      res.json(getRecipes);
    }else{
      const getRecipes = await Recipes.findAll({
        order: [
          ['name', 'DESC'],
        ]
      });
      res.json(getRecipes);
    }
  }catch(error){
    console.log(error);
  }
};

recipeController.getRecipesSortedByHealth = async(req, res)=>{
  const { sort } = req.params;

  try{
    if(sort === "best"){
      const getRecipes = await Recipes.findAll({
        order: [["healthScore", "DESC"]]
      });
      res.json(getRecipes);
    }else if(sort === "worst"){
      const getRecipes = await Recipes.findAll({
        order: [["healthScore", "ASC"]]
      });
      res.json(getRecipes);
    }else if(sort === "default"){
      const getRecipes = await Recipes.findAll({
        order: [["name", "ASC"]]
      });
      res.json(getRecipes);
    }
  }catch(error){
    console.log(error);
  }
};

recipeController.getRecipesByCreated = async(req, res)=>{
  const { sort } = req.params;
  try{
    if(sort === "api"){
      const getRecipes = await Recipes.findAll({
        where:{
          createdIndb: false
        },
        order:[["name", "ASC"]]
      });
      res.json(getRecipes);
    }else if(sort === "db"){
      const getRecipes = await Recipes.findAll({
        where:{
          createdIndb: true
        },
        order:[["name", "ASC"]]
      });
      res.json(getRecipes);
    }else if(sort === "mix"){
      const getRecipes = await Recipes.findAll({
        order:[["name", "ASC"]]
      });
      res.json(getRecipes);
    }
  }catch(error){
    console.log(error)
  }
};

recipeController.getRecipesByDiet = async(req, res) =>{
  const { diet } = req.params;
  try{
    if(diet === "default"){
      const getRecipes = await Recipes.findAll({
        order:[["name", "ASC"]]
      });
      res.json(getRecipes);
    }else{
      const getRecipes = await Recipes.findAll({
        where:{
          dietsInfo: {[Op.contains]: [diet]}
        },
        order:[["name", "ASC"]]
      });
      res.json(getRecipes);
    }
  }catch(error){
    console.log(error);
  }

};  

recipeController.recipesToDB = async(req, res) =>{
  try{
    const getRecipes = await axios.get(`${MY_API}/get-recipes`);
    const { data } = getRecipes;
    const { results } = data;
    let index = 0;
    
    results.map(async(el) => {
      index++;
      await Recipes.create({
        id: index,
        name: el.title,
        healthScore: el.healthScore,
        image: el.image,
        summary: el.summary,
        dietsInfo: el.diets,
        stepbyStep: (el.analyzedInstructions[0] ? el.analyzedInstructions[0].steps : [
          {
          "number": 1,
          "step": "Step not Provided by the creator, but don't worry, we trust in your skills!",
          "ingredients": [
          {
          "name": "Ingredients not provided by the creator :(",
          },
          ],
          "equipment": [{"name":"Equipment not provided by the creator :("}],
          }])
      })
    })
    
    res.json(results);
  }catch(error){
    console.log(error);
  }
};


// CREATED BY PEOPLE RECIPES ACTION

recipeController.createRecipe = async(req, res)=>{
  const newRecipe = req.body;
  const { name, summary, image, stepbyStep, dietsInfo, healthScore } = newRecipe;
  try{
    const getRecipes = await Recipes.findAll();

    const createRecipe = await Recipes.create({
      id: getRecipes.length + 1,
      name,
      summary,
      image,
      stepbyStep,
      healthScore,
      dietsInfo,
      createdIndb: true
    });
    
    res.json(createRecipe);
  }catch(error){
    console.log(error);
  }
};




module.exports = recipeController;