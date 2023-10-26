import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./content.scss";
import { useNavigate } from "react-router-dom";

function Content() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/2")
            .then(res => {
                setPokemons([...res.data.pokemon_entries]);
            })
    }, []);

    return (

        <Container>
            {/* <input type='text' onChange={(e) => {setSearch(e.target.value); console.log(search)}}></input> */}
            <div className="row row-cols-1 row-cols-6 g-3">
                {
                    pokemons.map(pokemon => {
                        return (
                            <div className="pokemon" key={pokemon.entry_number}><img style={{width: '90%'}} onClick={() => navigate('/gen1/' + pokemon.entry_number)} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`}/></div>
                        )
                    })
                }
            </div>
        </Container>
    )
}

export default Content;