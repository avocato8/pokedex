import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './spec.scss';
import axios from "axios";

function Spec(){
    let {id} = useParams();
    const [spec, setSpec] = useState();
    const [evolution, setEvolution] = useState();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)    //이름, 영어이름, 분류
            .then(res => {
                const data = [res.data.names[2].name, res.data.genera[1].genus];
                setSpec(data);
                console.log(spec);
                const link = res.data.evolution_chain.url;
                return axios.get(link);
            })
            //진화트리
            .then(res => {
                const evolutionChain = [res.data.chain.species.name];

                if (res.data.chain.evolves_to[0]) {
                    evolutionChain.push(res.data.chain.evolves_to[0].species.name);

                    if (res.data.chain.evolves_to[0].evolves_to[0]) {
                        evolutionChain.push(res.data.chain.evolves_to[0].evolves_to[0].species.name);
                    }
                }
                setEvolution(evolutionChain);

                return Promise.all(evolutionChain.map(pokemon => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)));
            })
    }, []);

    // 키 : res.data.height
    // 무게 : res.data.weight
    // 타입 : res.data.types[0].type.url -> https://pokeapi.co/api/v2/type/12 => res.names[1].name
    // res.data.types[1].type.url 




    return(
        <div className="spec container text-center"> //이름, 분류, 타입, 진화트리
            <div className="row">
                <div className="col"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}></img></div>
                <div className="col">
                    <div className="col">이름 : {spec}</div>
                    <div className="col">타입</div>
                    <div className="col">분류 : {spec}</div>
                    <div className="col">키 : </div>
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