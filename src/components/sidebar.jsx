import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(""); 

    const handleTab = (path) => {
        navigate(path);
        setActiveTab(path);
    }

    return (
        <>
            <div className="nav flex-column">
                <span className={`nav-link navigation active nav1 ${activeTab === '/' ? 'active' : ''}`} style={{backgroundColor: '#78C850'}} aria-current="page" onClick={() => handleTab('/')}>홈</span>
                <span className={`nav-link navigation ${activeTab === '/favorites' ? 'active' : ''}`} style={{backgroundColor: '#FFCC33'}}onClick={() => handleTab('/favorites')}>즐겨찾기</span>
            </div>
        </>
    )
}

export default Sidebar;