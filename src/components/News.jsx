import React, { Component } from 'react';
import NewsItem from './NewsItem'; 
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
  static defaultProps ={
    country: 'us',
    pageSize: 9,
    category: 'general',
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1baa9e59527d45cca62b6c627364873f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({ 
      articles: parsedata.articles, 
      totalResults: parsedata.totalResults, 
      loading: false 
    });
  }
//function start running after mount(birth of component)
  async componentDidMount() {
    this.updateNews();
  }
//function for applying infinite scroll
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1baa9e59527d45cca62b6c627364873f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles), // Append new articles
      totalResults: parsedata.totalResults
    });
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    const { mode } = this.props;

    return (
      <div className={`container my-3 text-${mode === 'light' ? 'dark' : 'light'}`}>
        <h1 className={`text-center my-3 font-bold text-${mode === 'light' ? 'dark' : 'light'}`}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {/* Conditionally render Spinner based on loading state */}
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        <div className='d-flex justify-content-between my-4'>
          <button 
            disabled={this.state.page === 1} 
            type="button" 
            onClick={this.handlePrevClick} 
            className="btn btn-dark mx-1"
          >
            &larr; Previous
          </button>
          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
            type="button" 
            onClick={this.handleNextClick} 
            className="btn btn-dark mx-1"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
