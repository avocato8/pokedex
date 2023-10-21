import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./content.scss";

function Content() {
    const [pokemons, setPokemons] = useState([]);
    const imgSize = 

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/2")
            .then(res => {
                setPokemons([...res.data.pokemon_entries]);
            })
    }, []);

    return (

        <Container>
            <div className="row row-cols-1 row-cols-6 g-2">
                {
                    [...pokemons].map(pokemon => {
                        return (
                            <div className="pokemon" key={pokemon.entry_number}><img style={{width: '150px'}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`}/></div>
                        )
                    })
                }
            </div>
        </Container>

            // 잔디 타입 초록색:HEX 색상 코드: #78C850<br></br>
            // 물 타입 파란색:HEX 색상 코드: #3CA0FF<br></br>
            // 불 타입 빨간색:HEX 색상 코드: #FF5050<br></br>
            // 전기 타입 노란색:HEX 색상 코드: #FFCC33<br></br>
            // 에스퍼 타입 보라색:HEX 색상 코드: #A020F0<br></br>

    )
}

export default Content;