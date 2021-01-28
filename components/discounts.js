import React from "react";

const Discounts = ({discountsData}) => {
    const discountsDataJSX = discountsData.map(item => <div>{item.content}{item.dateOfReceiving}</div>);
    return (
        <div>
            <h1>Discounts</h1>
            {discountsDataJSX}
        </div>
    );
};

export default Discounts;