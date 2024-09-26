import React, { Component } from 'react'
import NewsItem from './NewsItem'
import newsImg from '../assets/newsImg.png'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }


    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitilizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitilizeLetter(this.props.category)} - NewsFeed`;
    };

    apiKey = process.env.REACT_APP_API_KEY;

    async updateNews() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    }

    async componentDidMount() {
        this.updateNews();
    }


    handlePreviousButton = async () => {
        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();
    }

    handleNextButton = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        this.updateNews();

    }



    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
    };


    render() {
        return (
            <div className='container my-3 pt-2'>
                <h2 className='text-center mb-5 mt-5'><u>NewsFeed - Top {this.capitilizeLetter(this.props.category)} Headlines</u></h2>
                {/* {
                    this.state.loading && <Spinner />
                } */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length <= this.state.totalResults}
                    loader={<h4><Spinner /></h4>}
                >
                    <div className='d-flex flex-wrap gap-4 justify-content-center align-items-center '>
                        {
                            this.state.articles.map((element, key) => {
                                return <div key={key}>
                                    <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage ? element.urlToImage : newsImg} newsUrl={element.url} date={element.publishedAt} />
                                </div>
                            })
                        }
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between mt-5'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousButton}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextButton}>Next &rarr;</button>
                </div> */}

            </div>
        )
    }

}
