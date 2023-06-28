const dietController = () =>{};
const {Diets} = require("../database/sequelize");
require("dotenv").config();
const { MY_API } = process.env;
const axios = require("axios");

dietController.createAllDiets = async(req, res) =>{
  try{
    let dietsArray = [];
    const getRecipes = await axios.get(`${MY_API}/get-recipes`);
    const { data } = getRecipes;
    const { results } = data;

    results.map(el => {
      el.diets.map(diet => {
        if(!dietsArray.includes(diet)){
          dietsArray.push(diet);
        };
      })
    })

    const imagesObj = {
      dairyfree: "https://spoonacular.com/application/frontend/images/badges/dairy-free.svg",
      glutenfree:"https://spoonacular.com/application/frontend/images/badges/gluten-free.svg",
      lactoovovegetarian:"https://spoonacular.com/application/frontend/images/badges/vegetarian.svg",
      vegan: "https://spoonacular.com/application/frontend/images/badges/vegan.svg",
      paleolithic: "https://spoonacular.com/application/frontend/images/badges/paleo.svg",
      primal: "https://spoonacular.com/application/frontend/images/badges/paleo.svg",
      whole30: "https://www.svgrepo.com/show/275097/healthy-food-carrot.svg",
      pescatarian: "https://spoonacular.com/application/frontend/images/badges/pescetarian.svg",
      ketogenic: "https://www.svgrepo.com/show/275080/broccoli.svg",
      fodmapfriendly: "https://www.svgrepo.com/show/275107/healthy-food-vegetable.svg"
    }
  
    dietsArray.map(async(el) => {
      const newEl = el.replaceAll(" ", "");
      const createRecipe = await Diets.create({
        name: el,
        image: imagesObj[newEl]
      });
    });

    res.json(dietsArray);
  }catch(error){
    console.log(error);
  }

};

dietController.getAllDiets = async(req, res) =>{
  try{
    const getDiets = await Diets.findAll();
    res.json(getDiets);
  }catch(error){
    console.log(error);
  }
};

module.exports = dietController;