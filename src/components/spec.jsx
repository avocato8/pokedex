import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './spec.scss';
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleClick } from "../store";



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
    const [like, setLike] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const clickHandler = (event) => {
        const key = event.target.className;
        console.log('클릭한 요소의 key:', key);
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

                detailSpecData.push(detailSpecAPI.data.height, detailSpecAPI.data.weight);

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
            <div className="spec container text-center">
                <div className="row">
                    <div className="col"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}></img></div>
                    <div className="col">
                        <div className="col"><h1>{spec.name}</h1></div>
                        <div className="col">타입1: {spec.type1}</div>
                        <div className="col">타입2: {spec.type2}</div>
                        <div className="col">분류 : {spec.species}</div>
                        <div className="col">키 : {spec.height}</div>
                        <div className="col">무게: {spec.weight}</div>
                        <div className="col"><span className={id} onClick={clickHandler}>저장하기 : {like ? '❤️' : '🖤'}</span></div>
                        <div>
                        {
                            evolution.map(id => {
                                return (
                                    <img key={id} style={{ width: '200px' }} onClick={() => navigate('/gen1/' + id)} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} />
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