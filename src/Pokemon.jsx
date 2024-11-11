
import { useEffect, useState } from 'react';
import './pokemon.css'
import { PokemonContainer } from './PokemonContainer';
import axios from 'axios';

export const Pokemon = () => {

  // const pokemoonApi ='https://pokeapi.co/api/v2/pokemon?limit=100';

  const API_URL = `https://pokeapi.co/api/v2/pokemon`;

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // const [pageInput, setPageInput] = useState('');

  const itemsPerPage = 50;

  // const fechPokeApi = async ()=>{

  //   try {
  //     const res =await fetch(pokemoonApi);
  //     const data = await res.json();

  //    const pokemonData = data.results.map(async(result)=>{

  //         const resp = await fetch(result.url);
  //         const data = await resp.json();
  //        // console.log(data)

  //        return data;

  //     })
  //    /*
  //     Promise.all(pokemonData).then((pData)=> 
  //                {
  //                  setPokemon(pData);
  //                  setLoading(false);
  //                }
  //        ).catch(err=>{console.log(err);  setLoading(false);});
  //     */


  //      const pokeData = await Promise.all(pokemonData);

  //      setPokemon(pokeData);
  //      setLoading(false);


  //   } catch (error) {

  //     console.log(error)
  //     setLoading(false);
  //     setError(error)
  //   }

  // }

  const fechPokeApi = async () => {

    const offset = (currentPage - 1) * itemsPerPage;

    try {
      const res = await axios.get(`${API_URL}?offset=${offset}&limit=${itemsPerPage}`);
      const data = res.data;
      console.log(" data count ", data.count)
      setCount(data.count)
      const pokemonData = data.results.map(async (result) => {
        const resp = await axios.get(result.url);
        return resp.data;
      });

      // Wait for all pokemon data to be fetched
      const pokeData = await Promise.all(pokemonData);

      setPokemon(pokeData);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
    }
  }


  useEffect(() => {

    document.title = "Pokemon info"

    fechPokeApi();



  }, [currentPage])

  //    console.log("Pkemon Data pokemon  ",searchData)

  //   console.log(search);

  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearch('');
    }
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    // Adjust the range of pages when at the beginning or end of the pagination
    if (currentPage === 1) {
      endPage = Math.min(totalPages, startPage + 2); // Show next two pages
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, endPage - 2); // Show previous two pages
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };


  // Function to handle page input
  // const handlePageInputChange = (e) => {
  //   const value = e.target.value;
  //   // Only allow numeric input and handle the input value
  //   if (/^\d*$/.test(value)) {
  //     setPageInput(value);
  //   }
  // };

  // const handlePageInputBlur = () => {
  //   if (pageInput !== '') {
  //     const pageNum = Math.min(Math.max(1, Number(pageInput)), totalPages);
  //     setCurrentPage(pageNum);
  //     setPageInput(pageNum); // Set input to valid page number
  //   }
  // };



  const searchpokeData = pokemon.filter((data) => {
    return data.name.toLowerCase().includes(search.toLowerCase());
  });

  console.log("Pkemon Data pokemon  ", searchpokeData.length)

  if (loading) {

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </div>
    )

  }


  if (error) {

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>{error.message}</h2>
      </div>
    )

  }


  return (
    <>
      <div className='main-container'>
        <header>
          <h1>Lets Catch Pokémon</h1>
          <input type="text" placeholder="Search Pokémon" value={search} onChange={(e) => setSearch(e.target.value)} />
        </header>
        <PokemonContainer  pokelength={searchpokeData.length}  pokemon={searchpokeData} />


        {
          searchpokeData.length === 0 ? '': <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1} className="prev">Previous</button>



          {/* Page Number Buttons */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className='page-number'
              style={{ color: page === currentPage ? '#48d0b0' : '' }}
            >
              {page}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} className="next">Next</button>
        </div>
        }


        <footer>
          <p>&copy; 2024 Lets Catch Pokémon. All rights reserved. Developed By azahar78685@gmail.com</p>
        </footer>
      </div>
    </>
  )
}




// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Catch Pokémon</title>
//   <link rel="stylesheet" href="styles.css">
// </head>
// <body>

//   <header>
//     <h1>Lets Catch Pokémon</h1>
//     <input type="text" placeholder="Search Pokémon">
//   </header>



// </body>
// </html>


{/* <input
          type="text"
          value={pageInput}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlur}
          placeholder={`Page ${currentPage}`}
          style={{ margin: "0 10px", width: "60px", textAlign: "center" }}
        /> */}