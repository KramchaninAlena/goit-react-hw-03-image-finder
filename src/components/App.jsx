import { pixabayAPI } from "API/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import React, { Component } from 'react'
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import Modal from "./Modal/Modal";


export class App extends Component {
  state = {
    isLoading: false,
    isLoadMore: false,
    modalIsOpen: false,
    largeImage: null,
    inputValue: '',
    images: [] ,
    per_page: 12,
    page: 1,
    totalHits: 0,
    
    }
    
async componentDidUpdate(prevProps, prevState) {
  if (prevState.inputValue !== this.state.inputValue && this.state.inputValue) {
    // console.log('prevState.inputValue', prevState.inputValue)
    // console.log('this.state.inputValue', this.state.inputValue)
    try{
      await this.setState({isLoading: true, page: 1, images: [], })
      //  console.log(this.state.page)
        const { data } = await pixabayAPI(this.state.inputValue, this.state.page);
      this.setState({
        page: 1,
          images: data.hits,
          totalHits: data.total,
      })
      console.log(data)
      if( data.totalHits > this.state.per_page){
      this.setState({ isLoadMore: true })
    }else{
      this.setState({ isLoadMore: false })
    }
    
    }catch (error){
      console.log(error)
    }finally {
      this.setState({ isLoading: false });
    }
  }
    if(prevState.page < this.state.page) {
    const { data } = await pixabayAPI(this.state.inputValue, this.state.page);

    if(prevState.inputValue !== this.state.inputValue) {
      this.setState({images: data.hits})
      return
    }
    this.setState({images: [...prevState.images, ...data.hits]})
  }
};
componentWillUnmount() {
  document.removeEventListener('keydown', this.handleKeyEsc)
}

  handleSearchForm = inputValue => {
    this.setState({inputValue})
};
handleClickBtn = () => {
  this.setState((prevState) => {
    return { page: prevState.page + 1 };
  });
};

handleOpenModal = e => {
  this.setState({ largeImage: e.target.title });
  this.setState({ modalIsOpen: true });
  window.addEventListener('keydown', this.handleKeyEsc);
};
handleCloseModal = e => {
  if (e.currentTarget === e.target) this.setState({ modalIsOpen: false });
  
};
handleKeyEsc = (e) => {
  if (e.code === 'Escape') this.setState({ modalIsOpen: false });
  
}
  render() {
    const {isLoading, images, totalHits, largeImage, modalIsOpen} = this.state
    
    return (
      <>
      <Searchbar onSubmit={this.handleSearchForm}/>
      <ImageGallery>
      {isLoading && <Loader/>}
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                handleOpenModal={this.handleOpenModal}
              />
            );
          })}
        </ImageGallery>
        {images.length > 0 &&
          images.length < totalHits && (
            <Button onClick={this.handleClickBtn}/>
          )}
      {modalIsOpen && <Modal url={largeImage} handleCloseModal={this.handleCloseModal}/>}
      </>
    );
  }
}


