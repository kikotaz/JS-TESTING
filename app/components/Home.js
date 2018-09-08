var React = require('react');
var Tickers = require('./Tickers');

function Header() {
  return (
    <div className='home-container'>
      <h1>
        Welcome to Binance Info
        </h1>
      <h3 style={{ color: 'red' }}>
        *This app is for testing and personal educational purposes only
        </h3>
    </div>
  )
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Tickers />
      </div>
    )
  }
}

module.exports = Home;
