import TimeField from 'react-simple-timefield';
import React from 'react';
import './Inicio.css';

class Inicio extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      time: '18:31:45',
      zone: -3,
      UTCtime: '00:00:00',
      UTC: ''
    };
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onZoneChange = this.onZoneChange.bind(this);
    this.onGetUTC = this.onGetUTC.bind(this);
    this.getUTC = this.getUTC.bind(this);
  }

  onTimeChange(time) {
    this.setState({time});
  }
  onZoneChange(zone) {
    if (zone > 12) {
      zone = 12;
    } else if (zone < -12) {
      zone = -12;
    }
    this.setState({zone});
  }
  onGetUTC() {
    const { time, zone} = this.state;
    fetch('http://localhost:8080/prueba2/webresources/apiprueba',{
      method: 'post',
      body: "dato1="+time+"&dato2="+zone,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.text())
    .then((data) => this.getUTC(data ? JSON.parse(data) : {}));
  }
  getUTC(data) {
    this.setState({UTCtime: data.response.time, UTC: data.response.timezone});
  }

  render() {
    const { time, zone, UTCtime, UTC} = this.state;
    return (
      <div>
        <p>Hora:
        <TimeField value={time} onChange={(value) => {this.onTimeChange(value.target.value)}} showSeconds/>
        </p>
        <p>Zona horaria:
        <input className="zone" value={zone} type="number" onChange={(value) => {this.onZoneChange(value.target.value)}}/>
        </p>
        <br/>
        <button onClick={this.onGetUTC}>Convertir a UTC</button>
        <br/>
        <p>Resultado: {UTCtime} {UTC}</p>
      </div>
    );
  }
}

export default Inicio;