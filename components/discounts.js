import React from "react";

const Discounts = ({discountsData}) => {
    const discountsDataJSX = discountsData.map(item => <li key={item.id}>{item.content}{item.dateOfReceiving}</li>);
    return (
        <div>
            <h1>Discounts</h1>
            <ul>{discountsDataJSX}</ul>
        </div>
    );
};

export default Discounts;