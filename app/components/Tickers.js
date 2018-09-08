var React = require('react');
var PropTypes = require('prop-types');
var W3CWebSocket = require('websocket').w3cwebsocket;
var BinanceURL = 'wss://stream.binance.com:9443/stream?streams=';
var symbolsList = ['btc', 'eth', 'ltc', 'xrp'].map(function (i) {
  return i + 'usdt@ticker';
});
var tickersArray = [];


function getIcon(symbol) {
  var url = 'https://github.com/hyperdexapp/cryptocurrency-icons/blob/master/128/color/';
  switch (symbol) {
    case 'BTCUSDT':
      return url + 'btc.png?raw=true';
    case 'ETHUSDT':
      return url + 'eth.png?raw=true';
    case 'LTCUSDT':
      return url + 'ltc.png?raw=true';
    case 'XRPUSDT':
      return url + 'xrp.png?raw=true';
  }
}

function Price(props) {
  return (
    <ul className='tickers-list'>
      {props.tickersInfo.map(function (tickerInfo) {
        return (
          <li key={tickerInfo.s}
            className='ticker-item'>
            <div className='ticker-symbol'>
              {tickerInfo.s}
            </div>
            <ul className='ticker-info'>
              <li>
                <img
                  src={getIcon(tickerInfo.s)}
                  alt={'Icon for ' + tickerInfo.s}></img>
              </li>
              <li>
                Price : {tickerInfo.a}
              </li>
              <li style={tickerInfo.P >= 0 ? { color: 'green' } : { color: 'red' }}>
                Change : {tickerInfo.P + ' %'}
              </li>
              <li className= 'vol'>
                24Hrs Volume : {parseFloat(tickerInfo.q).toLocaleString() + ' USD'}
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

Price.proptypes = {
  tickersArray: PropTypes.array.isRequired,
}

class Tickers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tickers: []
    }
    this.separateStreams = this.separateStreams.bind(this);
  }

  //Opening a WebSocket connection with Binance
  componentDidMount() {
    //This variable will combine symbols in one string
    var streams = symbolsList.reduce(function (stream, i) {
      return stream + i + '/'
    }, '');
    //Connection configuration URL
    var client = new W3CWebSocket(BinanceURL + streams);
    //Receiving response from Binance API
    client.onmessage = function (event) {
      this.separateStreams(event);
    }.bind(this);
  }

  //This function will assign the data to Tickers Array
  separateStreams(event) {
    var incomingStream = JSON.parse(event.data);
    switch (incomingStream.stream) {
      case 'btcusdt@ticker':
        tickersArray[0] = incomingStream.data;
        break;
      case 'ethusdt@ticker':
        tickersArray[1] = incomingStream.data;
        break;
      case 'ltcusdt@ticker':
        tickersArray[2] = incomingStream.data;
        break;
      case 'xrpusdt@ticker':
        tickersArray[3] = incomingStream.data;
        break;
      default:
        console.log('I guess something is wrong');
        break;
    }
    this.setState(function () {
      return {
        tickers: tickersArray,
      }
    })
  }

  render() {
    return (
      <div>
        {
          !this.state.tickers ? <Price tickersInfo='Fetching data' /> :
            <Price
              tickersInfo={this.state.tickers}
            />
        }

      </div>
    )
  }
}

module.exports = Tickers;
