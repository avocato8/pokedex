import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    
    return (
        <>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">1세대</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">2세대</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">3세대</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">즐겨찾기</a>
                </li>
            </ul>
        </>
    )
}

export default Sidebar;