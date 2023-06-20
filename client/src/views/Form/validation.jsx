const validation = ({ name, summary, healthScore, steps, image, diets }, recipe) => {
  let error = {};
  let RegExpression = /^https?:\/\/.*\.(jpg|png|gif)$/;
  const nameSearch = (name) => recipe.some((recipe) => recipe.name === name);

  // NAME
  if (!name) {
    error.name = "Por favor, agregar nombre";
  }

  if (nameSearch(name)) {
    error.name = "Ya existe una receta con ese nombre";
  }
  if (name.length > 200) {
    error.name = "El nombre no puede ser mayor a 200 caracteres";
  }

  // SUMMARY
  if (!summary) {
    error.summary = "Por favor completar el summary";
  }
  if (summary.length < 30) {
    error.summary = "El summary no puede ser menor a 30 caracteres";
  }
  if (summary.length > 2300) {
    error.summary = "El summary no puede ser más largo que 2300 caracteres";
  }

  // HEALTH SCORE healthScore
  if (!healthScore) {
    error.healthScore = "Es necesario tener el healthScore";
  }
  if (healthScore > 100 || healthScore < 0) {
    error.healthScore = "El health score tiene que estar entre 0 y 100";
  }

  if (!Number.isInteger(Number(healthScore))) {
    error.healthScore = "El health score debe ser un número entero"
  }

  // STEPS
  if (!steps) {
    error.steps = "Por favor completar los steps";
  }
  if (steps.length > 4000) {
    error.steps = "Los steps no pueden ser mayor a 4000 caracteres";
  }
  if (steps.length < 10) {
    error.steps = "Los pasos no pueden ser menor a 10 caracteres.";
  }
  // IMAGE
  if (!image) {
    error.image = "Se requiere una imagen";
  }
  if (!RegExpression.test(image)) {
    error.image = "La URL de la imagen no cumple con los formatos (JPG, GIF, PNG)";
  }
  // DIETS
  if (!diets.length) {
    error.diets = "Por favor elige el tipo de dieta";
  }

  return error;
};

export default validation;
