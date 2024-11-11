

export const PokemonContainer = ({ pokemon ,pokelength}) => {

    console.log(pokelength);


    if (pokemon.length === 0) {
        return (
            <div className="pokemon-container">
                <div className="pokemon-message">
                    <img src="/no_data_found.png" />
                    <h3>Records not available , Try with another keyword or check another page</h3>
                </div>
            </div>
        )
    }

    return (
        <div style={{width: (pokelength ===1 )? "100%": ""}} className="pokemon-container">
            {
                pokemon.map((data) => {

                    return (
                        <div key={data.id} className="pokemon-card">
                            <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
                            <h2>{data.name}</h2>


                            <span className="type">{data.types.map((type) => (type.type.name)).join(" , ")}</span>
                            <p><strong>Height:</strong>{data.height}</p>
                            <p><strong>Weight:</strong>{data.weight}</p>
                            <p><strong>Speed:</strong>{data.stats[5].base_stat}</p>
                            <p><strong>Experience:</strong>{data.base_experience}</p>
                            <p><strong>Attack:</strong>{data.stats[1].base_stat}</p>
                            <p><strong>Abilities:</strong> {data.abilities.map((ability) => (ability.ability.name)).slice(0, 1).join(",")}</p>
                        </div>
                    )
                })
            }
          
        </div>
    )
}