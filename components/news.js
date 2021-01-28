import React from "react";

const News = ({newsData}) => {
    const newsDataJSX = newsData.map(item => <div>{item.content}{item.dateOfReceiving}</div>);

    return (
        <div>
            <h1>News</h1>
            {newsDataJSX}
        </div>
    );
};

export default News;