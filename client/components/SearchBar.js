import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SearchBarDiv = styled.div`
  margin-top: 30px;
  font-size: 30px;
  text-align: center;
`

const SearchBarForm = styled.form`
  position: relative;
`
const SearchBarInput = styled.input`
  width: 80%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #768692;
  color: #475058;
  background-color: inherit;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  font-size: 1.8rem;
  line-height: 1.4;
  padding-left: 10px;
  padding-top: 22px;
  cursor: text;
  &:focus {
    outline-width: 0;
    border-bottom: 1px solid #83D3B0;
    + label {
      font-size: 12px;
      top: 5px;
    }
    ~ button {
     color: #009cde;
   }
  }
`
const SearchBarLabel = styled.label`
  font-size: 22px;
  position: absolute;
  top: 25px;
  right: 20px;
  width: 88%;
  overflow: hidden;
  color: #768692;
  text-align: left;
  white-space: nowrap;
  pointer-events: none;
  transition: all 0.15s ease-out 0s;
`

const SearchBarClear = styled.button`
  position: absolute;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: inherit;
  color: #83D3B0;
  font-size: 20px;
  top: 25px;
  right: 100px;
  padding-right: 10px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`

export class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showClear: false,
      allowSearch: false,
      searchInput: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  clearSearch(e) {
    this.setState({ searchInput: '' })
    this.props.handleChange(e.target.value)
  }

  handleChange(e) {
    this.setState({ searchInput: e.target.value })
    this.props.handleChange(e.target.value)
  }

  render() {
    const clearStyle = this.state.searchInput ? { visibility: 'visible' } : { visibility: 'hidden' }
    const labelStyle = this.state.searchInput ? {
      fontSize: '12px',
      top: '5px',
    } : {}

    return (
      <SearchBarDiv>
        <SearchBarForm action=''>
          <SearchBarInput value={this.state.searchInput} onChange={this.handleChange} name='q' aria-required='true' />
          <SearchBarLabel for='search-field' style={labelStyle}>Search for a Friend...</SearchBarLabel>
          <SearchBarClear type='reset' onClick={this.clearSearch} style={clearStyle}>Clear</SearchBarClear>
        </SearchBarForm>
      </SearchBarDiv>
    )
  }
}

SearchBar.propTypes = {
  handleChange: PropTypes.func,
}

export default SearchBar
