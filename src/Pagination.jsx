import { useEffect, useState } from "react"
import axios from 'axios'

// export const PokemonPagination = () => {

//     const [pokemonList, setPokemonList] = useState([]);
//     const [count, setCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(true);

//     const itemsPerPage = 100;
//     const API_URL = `https://pokeapi.co/api/v2/pokemon`;


//     useEffect(() => {
//         setLoading(true);
//         const offset = (currentPage - 1) * itemsPerPage;

//         axios
//             .get(`${API_URL}?offset=${offset}&limit=${itemsPerPage}`)
//             .then((response) => {
//                 setPokemonList(response.data.results);
//                 setCount(response.data.count);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching Pokémon data:", error);
//                 setLoading(false);
//             });
//     }, [currentPage]);


//     const totalPages = Math.ceil(count / itemsPerPage);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     };


//     return (
//         <div>
//           <h2>Pokémon List</h2>
    
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ul>
//               {pokemonList.map((pokemon) => (
//                 <li key={pokemon.name}>
//                   <a href={pokemon.url}>{pokemon.name}</a>
//                 </li>
//               ))}
//             </ul>
//           )}
    
//           <div style={{ marginTop: "20px" }}>
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       );
// }



export const PokemonPagination = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 100;
  const API_URL = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * itemsPerPage;

    axios
      .get(`${API_URL}?offset=${offset}&limit=${itemsPerPage}`)
      .then((response) => {
        setPokemonList(response.data.results);
        setCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, startPage + 2);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div>
      <h2>Pokémon List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              <a href={pokemon.url}>{pokemon.name}</a>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
            style={{
              margin: "0 5px",
              fontWeight: page === currentPage ? 'bold' : 'normal',
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};


