import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import CourseList from './courseList.component';

import './styles.css'

class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion.title}</div>
      </div>
    )
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
    this.onSuggestionsFetchRequested(this.state);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .post('http://localhost:9200/vhs/courses/_search', {
        query: {
          multi_match: {
            query: value,
            fields: ['title', 'subtitle', 'description']
          }
        },
        sort: ['_score']
      })
      .then(res => {
        const results = res.data.hits.hits.map(h => h._source)
        this.setState({ suggestions: results, courses: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    return (
      <div className="App">
        <h1>VHS Suche</h1>
        <input className="search" value={this.state.searchValue} onChange={this.onChange}></input>
        <CourseList courses={this.state.suggestions}></CourseList>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<AutoComplete />, rootElement)
