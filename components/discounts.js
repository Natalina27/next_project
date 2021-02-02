import React from "react";

export const Discounts = ({discountsData}) => {
    console.log('Discount Component');

    const discountsDataJSX = discountsData.map(item => <li key={item.id}>{item.content}{item.dateOfReceiving}</li>);
    return (
        <div>
            <h1>Discounts</h1>
            <ul>{discountsDataJSX}</ul>
        </div>
    );
};