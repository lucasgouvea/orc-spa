import { FaChevronRight } from 'react-icons/fa';
import { Navitem } from './navitem';
import { Outlet } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom'


const selectedStyle = {
    marginTop: '-0.18em',
    textDecoration: 'underline',
    textUnderlineOffset: '0.4em',
    transition: '0.15s'
}

export function Navbar() {
    const { pathname } = useLocation();

    return (
        <>
            <div className="navbar">
                <div className={"logo"}>
                    <FaChevronRight
                        className={"icon"}
                        color="#FDFFF1"
                        size="12"
                        style={{ visibility: pathname === '/' ? 'visible' : 'hidden' }}
                    />
                    <p
                        className={"title"}
                    >
                        <Link to="/">ORC</Link>
                    </p>

                </div>

                <Navitem selectedStyle={selectedStyle} name={"motoristas"} pathname={pathname} />
            </div>
            <Outlet />
        </>

    )
}
