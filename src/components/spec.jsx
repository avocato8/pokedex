import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './spec.scss';
import axios from "axios";

function Spec(){
    let {id} = useParams();

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/2")
            .then(res => {
               
            })
    },[])

    return(
        <div className="spec container text-center">
            <div class="row" style={{}}>
                <div class="col">이미지</div>
                <div class="col">
                    <div class="col">테스트{id}</div>
                    <div class="col">이미지</div>
                    <div class="col">이미지</div>
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