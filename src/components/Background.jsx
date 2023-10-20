import { TbPokeball } from 'react-icons/tb';
import './Background.scss';

function Background(){
    const iconCount = 20;

    return(
        <div className="background">
            {    
                [...Array(iconCount)].map((_, index) => {
                    <TbPokeball key={index}/>
                })
            }
        </div>
    )
}

export default Background;