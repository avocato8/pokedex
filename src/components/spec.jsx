import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './spec.scss';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "../store";
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im';



function Spec() {
    let { id } = useParams();
    let [spec, setSpec] = useState({
        name: "",
        type1: "",
        type2: "",
        species: "",
        height: 0,
        weight: 0,
    });
    const [evolution, setEvolution] = useState([]);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let pokemons = useSelector(state => state.checkedPokemon);
    const [like, setLike] = useState(pokemons.includes(id) ? true : false);

    const clickHandler = (event) => {
        console.log(event.target);
        setLike(like ? false : true);
        const key = event.target.className;
        dispatch(handleClick(key));
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const specData = [response.data.names[2].name, response.data.genera[1].genus]; //이름, 분류
                const EngName = response.data.name;

                const detailSpecAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${EngName}`);

                let detailSpecData = [];   //타입1, 타입2, 키, 무게

                const firstTypeAPI = await axios.get(detailSpecAPI.data.types[0].type.url);
                const firstTypeData = firstTypeAPI.data.names[1].name;
                detailSpecData.push(firstTypeData);

                if (detailSpecAPI.data.types[1] != null) {
                    const secondTypeAPI = await axios.get(detailSpecAPI.data.types[1].type.url);
                    const secondTypeData = secondTypeAPI.data.names[1].name;
                    detailSpecData.push(secondTypeData);
                }
                else {
                    detailSpecData.push(null);
                }

                const height = detailSpecAPI.data.height / 10 + 'm';
                const weight = detailSpecAPI.data.weight / 10 + 'kg';
                //detailSpecData.push(detailSpecAPI.data.height, detailSpecAPI.data.weight);
                detailSpecData.push(height, weight);

                const evolutionAPI = await axios.get(response.data.evolution_chain.url);
                let evolutionData = [];

                if (evolutionAPI.data.chain && evolutionAPI.data.chain.species) {   //진화트리
                    const url = evolutionAPI.data.chain.species.url;
                    const numberPattern = /\/(\d+)\//;
                    const match = url.match(numberPattern);
                    console.log(match);
                    evolutionData.push(match[1]);

                    if (evolutionAPI.data.chain.evolves_to[0] != undefined) {
                        const url = evolutionAPI.data.chain.evolves_to[0].species.url;
                        const numberPattern = /\/(\d+)\//;
                        const match = url.match(numberPattern);
                        console.log(match);
                        evolutionData.push(match[1]);

                        if (evolutionAPI.data.chain.evolves_to[0].evolves_to[0] != undefined) {
                            const url = evolutionAPI.data.chain.evolves_to[0].evolves_to[0].species.url;
                            const numberPattern = /\/(\d+)\//;
                            const match = url.match(numberPattern);
                            console.log(match);
                            evolutionData.push(match[1]);
                        }
                    }
                    setEvolution([...evolutionData]);
                    console.log(evolutionData);
                }
                const specs = [specData[0], specData[1], detailSpecData[2], detailSpecData[3], detailSpecData[0], detailSpecData[1]];
                setSpec({ ...spec, name: specs[0], type1: specs[4], type2: specs[5], species: specs[1], height: specs[2], weight: specs[3] });
            }

            catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <div>
            <div className="container spec" style={{ backgroundImage: "url('/backgroundimage.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                <div className="row">
                    
                    <div className="col text-end"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}></img>
                    </div>

                    <div className="col">
                        <div><h1 style={{ fontWeight: 'bold' }}>{spec.name}</h1></div>

                            <div style={{display: 'flex', height: '100px', gap: 'auto'}}>
                                <div>타입<br></br>{spec.type1} {spec.type2}</div>
                                <div>분류<br></br>{spec.species}</div>
                                <div>키<br></br>{spec.height}</div>
                                <div>무게<br></br>{spec.weight}</div>
                            </div>
                            <div className="col"><span className={id} onClick={clickHandler}>저장하기 : {like ? '❤️' : '🖤'}</span></div>
                        <div>
                            {
                                evolution.map(id => {
                                    return (
                                        <img key={id} className="evolutionTree" style={{ width: '150px' }} onClick={() => navigate('/gen1/' + id)} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
// 잔디 타입 초록색:HEX 색상 코드: #78C850<br></br>
// 물 타입 파란색:HEX 색상 코드: #3CA0FF<br></br>
// 불 타입 빨간색:HEX 색상 코드: #FF5050<br></br>
// 전기 타입 노란색:HEX 색상 코드: #FFCC33<br></br>
// 에스퍼 타입 보라색:HEX 색상 코드: #A020F0<br></br>

export default Spec;