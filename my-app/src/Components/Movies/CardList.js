import React from 'react';
import Card from './Card';

const CardList = ({ movies, onButtonRedirect, loadMovie }) => {
  console.log(movies);
  return (
    <div>
      {
        movies.map((movie, i) => {
          return (
            <Card
              key = {i}
              img = {movies[i].img}
              title = {movies[i].title}
              genre = {movies[i].genre}
              onButtonRedirect = {onButtonRedirect}
              loadMovie = {loadMovie}
            />
          );
        })
      }
    </div>
  )
}

export default CardList;
