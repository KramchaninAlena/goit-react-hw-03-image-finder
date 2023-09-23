import css from './Searchbar.module.css'
import React, { Component } from 'react'

export class Searchbar extends Component {
state ={ 
    inputValue: '',
}

    handleValueChange = ({target: {value}}) => {
        this.setState({inputValue: value.toLowerCase()})
    }
    handleSubmit = evt => {
        evt.preventDefault();
        if(!this.state.inputValue.trim()){
            return
        }
        this.props.onSubmit(this.state.inputValue);
        this.setState({ inputValue: '' })
    }
  render() {
    return (
        <header className={css.Searchbar}>
      <form onSubmit={this.handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>
    
        <input
          className={css['SearchForm-input']}
          type="text"
        //   autocomplete="off"
        //   autofocus
          placeholder="Search images and photos"
          value={this.state.inputValue}
          onChange={this.handleValueChange}
        />
      </form>
    </header>
      )
  }
}



