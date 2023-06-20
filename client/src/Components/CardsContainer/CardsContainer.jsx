import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";


const CardsContainer = () => {
  const recipesCopy = useSelector((state) => state.recipesCopy);
  const isLoading = useSelector((state) => state.isLoading);


  const [pagination, setPagination] = useState({
    currentPage: 1,
    recipesPerPage: 9
  });


  useEffect(() => {
    setPagination(() => ({
      ...pagination,
      currentPage: 1
    }));
  }, [recipesCopy]);  



  const { currentPage, recipesPerPage } = pagination;

  const indexOfLastCharacter = currentPage * recipesPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - recipesPerPage;
  const currentRecipes = recipesCopy.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const maxPages = Math.ceil(recipesCopy.length / recipesPerPage)

  const clickPage = (pageNumber) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber
    });
  };

  const clickPrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination({
        ...pagination,
        currentPage: (currentPage - 1)
      })
    };
  };
  const clickNextPage = () => {
    if (pagination.currentPage < maxPages) {
      setPagination({
        ...pagination,
        currentPage: (currentPage + 1)
      })
    };
  };

  return (
    <div className={style.cointainer}>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <div className={style.spinner}></div> 
          <p>Loading</p>
        </div>
      ) : (
        <div className={style.containerCards}>
          {currentRecipes.length > 0 ? (
            currentRecipes.map(({ id, name, image, summary, diets, healthScore, steps, createdInDB }) => (
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                summary={summary}
                diets={diets}
                healthScore={healthScore}
                steps={steps}
                createdInDB={createdInDB}
              />
            ))
          ) : (
            <p>No hay resultados</p>
          )}
        </div>
      )}
      {currentRecipes.length > 0 ?
      <Pagination
        maxPages={maxPages}
        clickPage={clickPage}
        clickPrevPage={clickPrevPage}
        clickNextPage={clickNextPage}
        currentPage={currentPage}
      />:""}
    </div>
  );
};

export default CardsContainer;