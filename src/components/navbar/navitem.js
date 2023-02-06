import { Link } from 'react-router-dom'

export function Navitem({ selectedStyle, name, pathname }) {
    return (
        <div className={"right_nav"}>
            <div
                id={name}
                style={pathname === `/${name}` ? selectedStyle : {}}
            >
                <Link to={`/${name}`}>
                    {name}
                </Link>
            </div>
        </div>
    )
}