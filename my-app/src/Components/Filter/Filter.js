import React from 'react';

export default class Filter extends React.Component {
  render() {
    return (
      <div className = "filter">
        <div className = "filter-result">{this.props.count} Movies</div>
        <div className = "filter-sort">
        Order {" "}
        <select value = {this.props.sort} onChange = {this.props.sortMovies}>
          <option value = "Shortest">Shortest Duration</option>
          <option value = "Longest">Longest Duration</option>
          <option value = "Latest">Latest</option>
          <option value = "Oldest">Oldest</option>
          <option value = "Price (Low to High)">Price (Low to High)</option>
          <option value = "Price (High to Low)">Price (High to Low)</option>
          <option value = "A-Z">A-Z</option>
          <option value = "Z-A">Z-A</option>
        </select>
        </div>
        <div className = "filter-genre">
        Genres {" "}
        <select value = {this.props.genre} onChange = {this.props.filterMovies}>
          <option value = "ALL">ALL</option>
          <option value = "Action">Action</option>
          <option value = "Adventure">Adventure</option>
          <option value = "Comedy">Comedy</option>
          <option value = "Horror">Horror</option>
          <option value = "Romance">Romance</option>
        </select>
        </div>
        <div className = "filter-numTickets" >My Tickets: { this.props.countTickets }</div>
      </div>
    );
  }
}
