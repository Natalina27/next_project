import React from "react";

export const News = ({newsData}) => {
    const newsDataJSX = newsData.map(item => <li key={item.id}>{item.content}{item.dateOfReceiving}</li>);
    return (
        <div>
            <h1>News</h1>
            <ul>{newsDataJSX}</ul>
        </div>
    );
};