// External Lib Imports
let React = require('react');
let NavLink = require('react-router-dom').NavLink;

function Nav() {
  return(
    <ul className="nav">
      <li>
        <NavLink exact className="nav-link"
          activeClassName="nav-link__active" to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className="nav-link"
          activeClassName="nav-link__active" to="/battle">
          Battle
        </NavLink>
      </li>

      <li>
        <NavLink className="nav-link"
          activeClassName="nav-link__active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = Nav;
