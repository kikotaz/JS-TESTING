var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink activeClassName='home-logo' to='/'>Binance Info</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/bin'>Binance</NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
