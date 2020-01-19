import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';


class SearchPage extends Component {
  state = {
    resultsData: [
        {name: "Penny",
         language: "Spanish",
         credentials: "B.S. Communications",
         city: "Davis,CA",
         rating: 4
        },
        {name: "Yeet",
         language: "Tagalog",
         credentials: "B.S. Communications",
         city: "San Jose,CA",
         rating: 1
        }
    ],
  }

  render() {
    return(
      <div className="SearchPage">
        <h1>Search for an interpreter</h1>
        <SearchBar/>
        <ul>
          <SearchResults resultsData = {this.state.resultsData}/>
        </ul>
      </div>
    );
  }
}

export default SearchPage;