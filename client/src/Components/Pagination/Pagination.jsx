import style from "./Pagination.module.css"

const Pagination = ({ maxPages, clickPage, clickPrevPage, clickNextPage, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={style.Container}>

            <a
                onClick={clickPrevPage}
                className={currentPage === 1 ? style.disabled : style.arrows}
                disabled={currentPage === 1}
            >
                Anterior
            </a>
            {pageNumbers?.map(number => {
                const isActive = number === currentPage;
                return (
                    <li key={number} className={isActive ? style.activePage : style.pages} onClick={() => clickPage(number)}>
                        {number}
                    </li>
                );
            })}
            <a
                onClick={clickNextPage}
                className={currentPage === maxPages ? style.disabled : style.arrows}
                disabled={currentPage === maxPages}
            >
                Siguiente
            </a>

        </nav>
    );
}

export default Pagination;