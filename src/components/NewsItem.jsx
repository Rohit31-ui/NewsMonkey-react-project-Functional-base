import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl,author,date ,source}) => {
 
   
    return (
      <div>
        <div className="card h-100">
          {/* badge */}
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
          {source}
        </span>

          <img src={!imageUrl?
          "https://media.cnn.com/api/v1/images/stellar/prod/2024-09-24t083513z-2099667105-rc2w6aavvfw4-rtrmadp-3-israel-palestinians-lebanon.JPG?c=16x9&q=w_800,c_fill": imageUrl }
            className="card-img-top" alt="news"/>

          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="text-body-secondary">By {author? author : "unknown"} on {new Date(date).toGMTString()}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
