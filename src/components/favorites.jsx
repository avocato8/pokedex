import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Favorites() {
    let pokemons = useSelector(state => state.checkedPokemon);
    let navigate = useNavigate();

    return (
        <Container>
            <div className="row row-cols-1 row-cols-6 auto">
                {
                    [...pokemons].map(pokemon => {
                        return (
                            <div className="pokemon" key={pokemon}><img style={{width: '85%'}} onClick={() => navigate('/gen1/' + pokemon)} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`}/></div>
                        )
                    })
                }
            </div>
        </Container>
    )
}

export default Favorites;