import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate();
    let location = useLocation();
    return (
        <>
            <div className="nav flex-column">
                <span className={`nav-link navigation nav1 active ${location.pathname === '/' ? 'active' : ''}`} style={{backgroundColor: '#78C850'}} aria-current="page" onClick={() => navigate('/')}>홈</span>
                <span className={`nav-link navigation ${location.pathname === '/favorites' ? 'active' : ''}`} style={{backgroundColor: '#FFCC33'}}onClick={() => navigate('/favorites')}>즐겨찾기</span>
            </div>
        </>
    )
}

export default Sidebar;