import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './spec.scss';
import axios from "axios";

function Spec(){
    let {id} = useParams();
    let [spec, setSpec] = useState({
        name: "",
        type1: "",
        type2: "",
        species: "",
        height: 0,
        weight: 0,
    });
    let [evolution, setEvolution] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const specData = [response.data.names[2].name, response.data.genera[1].genus]; //이름, 분류
                const EngName = response.data.name;


                const detailSpecAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${EngName}`);
                console.log(detailSpecAPI)

                let detailSpecData = [];   //타입1, 타입2, 키, 무게

                const firstTypeAPI = await axios.get(detailSpecAPI.data.types[0].type.url);
                console.log(firstTypeAPI.data);
                const firstTypeData = firstTypeAPI.data.names[1].name;
                detailSpecData.push(firstTypeData);

                if (detailSpecAPI.data.types[1] != null) {
                    const secondTypeAPI = await axios.get(detailSpecAPI.data.types[1].type.url);
                    const secondTypeData = secondTypeAPI.data.names[1].name;
                    detailSpecData.push(secondTypeData);
                }

                detailSpecData.push(detailSpecAPI.data.height, detailSpecAPI.data.weight);
                console.log(detailSpecData);


                const evolutionAPI = await axios.get(response.data.evolution_chain.url);
                let evolutionData = [];

                if (evolutionAPI.data.chain && evolutionAPI.data.chain.species) {   //진화트리
                    evolutionData.push(evolutionAPI.data.chain.species.name);

                    if (evolutionAPI.data.chain.evolves_to[0] != null) {
                        evolutionData.push(evolutionAPI.data.chain.evolves_to[0].species.name);

                        if (evolutionAPI.data.chain.evolves_to[0].evolves_to[0] != null) {
                            evolutionData.push(evolutionAPI.data.chain.evolves_to[0].evolves_to[0].species.name);
                        }
                    }
                }

                const specs = [specData[0], detailSpecData[0], detailSpecData[1], specData[1], detailSpecData[2], detailSpecData[3]];
                setSpec({ ...spec, name: specs[0], type1: specs[1], type2: specs[2], species: specs[3], height: specs[4], weight: specs[5] });
                setEvolution(evolutionData);
            }

            catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    // axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    //     .then(res => {
    //         spec = [res.data.names[2].name, res.data.name, res.data.genera[1].genus]; //이름, 영어이름, 분류
    //         const evolutionAPI = res.data.evolution_chain.url;

    //         console.log(spec);
    //         console.log(evolutionAPI);
    //         return axios.get(evolutionAPI);
    //     })

    //     .then((res) => {
    //         if (res.data.chain.species.name != null) {   //진화트리
    //             evolution.push(res.data.chain.species.name);
    //         }
    //         if (res.data.chain.evolves_to[0].species.name != null) {
    //             evolution.push(res.data.chain.evolves_to[0].species.name);
    //         }
    //         if (res.data.chain.evolves_to[0].evolves_to[0].species.name != null) {
    //             evolution.push(res.data.chain.evolves_to[0].evolves_to[0].species.name);
    //         }
    //         console.log(evolution);
    //     //return axios.get(`https://pokeapi.co/api/v2/pokemon/${EngName}`)
    //     })

    // .then(
    //     evolution.map((pokemon) => {
    //         axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    //             .then(res => {
    //                 console.log(res.data);
    //             })
    //     })
    // )



    // 키 : res.data.height
    // 무게 : res.data.weight
    // 타입 : res.data.types[0].type.url -> https://pokeapi.co/api/v2/type/12 => res.names[1].name
    // res.data.types[1].type.url 




    return(
        <div className="spec container text-center"> //이름, 타입1, 타입2, 분류, 키, 무게, 진화트리
            <div className="row">
                <div className="col"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}></img></div>
                <div className="col">
                    <div className="col">이름 : {spec.name}</div>
                    <div className="col">타입1: {spec.type1}</div>
                    <div className="col">타입2: {spec.type2}</div>
                    <div className="col">분류 : {spec.species}</div>
                    <div className="col">키 : {spec.height}</div>
                    <div className="col">무게: {spec.weight}</div>
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