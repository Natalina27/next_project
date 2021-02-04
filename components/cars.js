import React from "react";

export const Cars = ({carsData}) => {
    const carsDataJSX = carsData.map(item => <li key={item.id}>{item.content}{item.dateOfReceiving}</li>);
    return (
        <div>
          <h1> Cars page</h1>
          <ul>{carsDataJSX}</ul>
        </div>
    );
};
