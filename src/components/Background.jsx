import { TbPokeball } from 'react-icons/tb';
import './Background.scss';

function Background(){
    const iconCount = 210;

    return(
        <div className="background">
            {   
                [...Array(iconCount)].map((_, index) => {
                    return <TbPokeball className="icon" key={index}/>
                })
            }
        </div>
    )
}

export default Background;