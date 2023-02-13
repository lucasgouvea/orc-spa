import { Link } from "react-router-dom";

export function Navitem({ selectedStyle, navName, routeName, pathName }) {
  return (
    <div className={"right_nav"}>
      <div id={navName} style={pathName === `/${routeName}` ? selectedStyle : {}}>
        <Link to={`/${routeName}`}>{navName}</Link>
      </div>
    </div>
  );
}
