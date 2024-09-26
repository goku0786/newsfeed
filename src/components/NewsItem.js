import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {

        let { title, description, imageUrl, newsUrl, date } = this.props;

        return (

            <div className='card pb-3' style={{ width: "400px" }}>
                <div className='d-flex justify-content-center align-items-center overflow-hidden' style={{ height: "200px" }} >
                    <img src={imageUrl} alt='...' style={{ width: "100%" }} />
                </div>
                <h5 className="card-title mt-2 px-3">{title} : <span className='text-muted text-sm d-inline'>{date.slice(0, 10)}</span></h5>
                <p className="card-text px-3">{description}</p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary mx-3">Read more</a>
            </div>

        )
    }
}
