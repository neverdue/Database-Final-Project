import React from 'react';
import './CardDetails.css';

export default class CardDeatils extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bid: ''
    };
  }

  updateTickets = () => {
    if (this.state.bid === '') {
      return;
    }
    fetch('http://localhost:3000/buyTicket', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.user.email,
        phoneno: this.props.user.phoneno,
        title: this.props.currentMovie.title,
        director: this.props.currentMovie.director,
        price: this.props.currentMovie.price,
        bid: this.state.bid
      })
    })
      .then(response => response.json())
      .then(movie => {
        console.log(this.props)
        console.log(movie);
        if (movie.title) {
          fetch('http://localhost:3000/getCountTickets', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: this.props.user.email,
              phoneno: this.props.user.phoneno,
            })
          })
          .then(response => response.json())
          .then(obj => {
            this.updateCount(obj);
            this.props.onButtonRedirect('home');
          })
        }
      })

      fetch('http://localhost:3000/myTickets', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.props.user.email
        })
      })
      .then(response => response.json())
      .then(movies => {
        this.props.myTickets(movies);
      })
  }

  updateCount = (obj) => {
    fetch('http://localhost:3000/myTickets', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.user.email,
        phoneno: this.props.user.phoneno
      })
    })
    .then(response => response.json())
    .then(movies => {
      this.props.updateCount(obj, movies);
    })
  }

  onChangeValue = (event) => {
    console.log(event.target.value);
    this.setState({ bid: event.target.value })
  }

  findTheatre = (bid) => {
    console.log(bid);
    for(let theatre of this.props.theatres) {
      if (theatre.bid === bid) {
        return theatre.theatretype;
      }
    }
  }

  render() {
    let duration = this.props.currentMovie.duration;
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    return (
      <div>
        <div className = "center">
          <div className="fl w-40 tc dib br3 shadow-5 bg-light-green pa2 bw2">
            <img alt = "Movie Poster" src = {this.props.currentMovie.img}/>
            <div>
              <p>Title: {this.props.currentMovie.title}</p>
              <p>Director: {this.props.currentMovie.director}</p>
              <p>Rating: {this.props.currentMovie.rating} / 10</p>
              <p>Genre: {this.props.currentMovie.genre}</p>
              {
                (this.props.showBuy === false)
                ? <p>
                Theatre: { this.props.currentTheatre.theatretype }
                </p>
                :
                <div></div>
              }
              <p>Duration: {hours} hour and {minutes} minutes</p>
              <p>Price: ${this.props.currentMovie.price}</p>
            </div>
          </div>
        </div>
        { (this.props.showBuy === true)
          ? <div>
          <div className = "center">
            <p>Theatre Type</p>
          </div>
          <div className = " center bw2" onChange={this.onChangeValue}>
          {
            this.props.theatres.map((theatre, i) => {
              return (<label>
                <input
                key = {i}
                className = "ma4"
                type = 'radio'
                value = { this.props.theatres[i].bid }
                name = 'theatre'
                / >
                { this.props.theatres[i].theatretype }
                </label>
              )
            })
          }
          </div>
          </div>
          :
          <div></div>
        }
        <div className = "center ma4 mb3">
          <div onClick={() => this.props.onButtonRedirect('home')} href="#0" className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6.1 dib">
            <p className="f6 link dim black db pointer">Home</p>
          </div>
            { (this.props.showBuy === true)
            ?
              <div onClick={this.updateTickets} href="#0" style = {{ 'margin-left': '4rem' }} className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6.1 dib">
                <p className="f6 link dim black db pointer">Buy</p>
              </div>
            :
            <span></span>
          }
        </div>
      </div>
    )
  }
}
