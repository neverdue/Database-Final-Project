import React from 'react';

export default class Card extends React.Component {

  onChange = () => {
    this.props.loadMovie(this.props.title);
  }

  render() {
    return (
      <div onClick={this.onChange} href="#0" className="card fl w-25 tc dib br3 shadow-5 bg-light-green ml5 ma3 pa3 grow bw2" onmouseover="" style={{cursor: 'pointer'}}>
        <img src = {this.props.img} alt = "Movie Poster"/>
        <div>
          <h2>{ this.props.title }</h2>
          <p>{ this.props.genre }</p>
        </div>
      </div>
    )
  }
}
