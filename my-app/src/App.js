// import logo from './OMA-Cinema.svg';
import './App.css';
import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import CardList from './Components/Movies/CardList';
import CardDetails from './Components/Movies/CardDetails';
import Filter from './Components/Filter/Filter';
import Account from './Components/Account/Account';

function getDateObj (string) {
  let arr = string.split('-');
  return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
}

const initialState = {
  Input: '',
  ImageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    count: 0,
    myTickets: []
  },
  showBuy: true,
  allMovies: {},
  theatres: [],
  currentTheatre: {},
  movies: [],
  myTickets: [],
  currentMovie: {},
  currentMovieDetails: {},
  sort: 'Shortest',
  genre: '',
  showMessage: false
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    fetch('http://localhost:3000/movies').then(response => response.json()).then(data => {
      this.state.allMovies = data;
    })
    this.setState({ movies: this.state.allMovies['ALL'] });
    fetch('http://localhost:3000/theatres').then(response => response.json()).then(data => {
      this.state.theatres = data;
    })
  }

  sortMovies = (event) => {
    const sort = event.target.value;
    console.log(event.target.value, this.state.allMovies[this.state.genre], this.state.movies);
    this.setState((state) => ({
      sort: sort,
      movies: this.state.movies.slice().sort((a, b) => (
        sort === 'A-Z' ?
        ((a.title > b.title) ? 1 : -1):
        sort === 'Z-A' ?
        ((a.title < b.title) ? 1 : -1):
        sort === 'Shortest' ?
        ((parseInt(a.duration) > parseInt(b.duration)) ? 1 : -1 ) :
        sort === 'Longest' ?
        ((parseInt(a.duration) < parseInt(b.duration)) ? 1 : -1 ) :
        sort === 'Price (Low to High)' ?
        (( a.price > b.price ) ? 1 : -1) :
        sort === 'Price (High to Low)' ?
        (( a.price < b.price ) ? 1 : -1) :
        sort === 'Latest' ?
        (( getDateObj(a.whenReleased).getTime() < getDateObj(b.whenReleased).getTime() ) ? 1 : -1) :
        sort === 'Oldest' ?
        (( getDateObj(a.whenReleased).getTime() > getDateObj(b.whenReleased).getTime() ) ? 1 : -1) :
        ((a.title > b.title) ? 1 : -1)
      ))
    }))
  }

  filterMovies = (event) => {
    if (this.state.allMovies[event.target.value] === undefined) {
      this.setState((state) => ({
        movies: [],
        genre: event.target.value
      }));
    } else {
      this.state.movies = this.state.allMovies[event.target.value];
      this.setState({ genre: event.target.value });
    }
    this.sortMovies({
      target: {
        value: this.state.sort
      }
    })
  }

  loadUser = (data, count = { count: 0 }) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      phoneno: data.phoneno,
      count: count.count,
      }
    })
    this.filterMovies({
      target: {
        value: 'ALL'
      }
    })
    this.sortMovies({
      target: {
        value: 'Shortest'
      }
    })
  }

  updateCount = (obj, movies) => {
    this.setState({ myTickets: movies });
    this.setState({
      user: {
        id: this.state.user.id,
        name: this.state.user.name,
        email: this.state.user.email,
        phoneno: this.state.user.phoneno,
        count: obj.count
      }
    });
  }

  loadMovie = (title) => {
    fetch('http://localhost:3000/findMovie', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title
      })
    })
      .then(response => response.json())
      .then(movie => {
        if (movie.title) {
          this.setState({ currentMovie: movie })
        }
      })

    fetch('http://localhost:3000/findDetails', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title
      })
    })
      .then(response => response.json())
      .then(movie => {
        if (movie.title) {
          this.setState({ currentMovieDetails: movie })
          fetch('http://localhost:3000/currentTheatre', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              bid: movie.bid
            })
          })
            .then(response => response.json())
            .then(theatre => {
              if (theatre.bid) {
                this.setState({ currentTheatre: theatre })
              }
            })
        }
      })

      this.onButtonRedirect('details')
  }

  myTickets = (data) => {
    console.log('hi', data)
    this.state.myTickets = data;
    this.setState({ myTickets: data });
     // this.onButtonRedirect('myTickets')
  }

  onInputChange = (event) => {
    this.setState({ Input: event.target.value });
  }

  onButtonRedirect = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true});
      this.setState({ showBuy: true })
    } else if (route === 'signin') {
      this.setState(initialState);
      window.location.reload();
    } else if (route === 'register') {
      this.setState({ showMessage: false })
    } else if (route === 'myTickets') {
      this.setState({ showBuy: false })
    }
    this.setState({route: route});
  }

  changeMessage = (route) => {
    if (route === 'register') {
      this.setState({ showMessage: true });
    }
  }

  render() {
    return (
      <div>
      <Navigation isSignedIn={this.state.isSignedIn} onButtonRedirect={this.onButtonRedirect}/>
      { (this.state.route === 'signin')
      ? <SignIn myTickets = { this.myTickets } loadUser={this.loadUser} onButtonRedirect={this.onButtonRedirect} showMessage={this.state.showMessage}/>
      : ((this.state.route === 'register')
      ? <Register loadUser={this.loadUser} onButtonRedirect={this.onButtonRedirect} showMessage={this.state.showMessage} changeMessage={this.changeMessage}/>
      : (this.state.route === 'home')
      ? <div>
          <Filter
          count = { this.state.movies.length }
          sort = { this.state.sort }
          genre = { this.state.genre }
          filterMovies = { this.filterMovies }
          sortMovies = { this.sortMovies }
          countTickets = { this.state.user.count }
          myTickets = { this.myTickets }
          />
          <CardList movies = { this.state.movies } onButtonRedirect = {this.onButtonRedirect} loadMovie = {this.loadMovie}/>
      </div>
      : (this.state.route === 'details')
      ? <CardDetails
        user = { this.state.user }
        currentMovie = { this.state.currentMovie }
        currentTheatre = { this.state.currentTheatre }
        onButtonRedirect = {this.onButtonRedirect}
        currentMovieDetails = {this.state.currentMovieDetails}
        updateCount = { this.updateCount }
        myTickets = { this.myTickets }
        theatres = { this.state.theatres }
        showBuy = { this.state.showBuy }
        />
      : (this.state.route === 'account')
      ? <Account
        email = { this.state.user.email }
        onButtonRedirect = { this.onButtonRedirect }
      />
      :
      <CardList movies = { this.state.myTickets } onButtonRedirect = {this.onButtonRedirect} loadMovie = {this.loadMovie}/>
    )}
    </div>
  );
  }
}

export default App;
