import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate();
    return (
        <>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" onClick={() => navigate('/')}>홈</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/favorites')}>즐겨찾기</a>
                </li>
            </ul>
        </>
    )
}

export default Sidebar;