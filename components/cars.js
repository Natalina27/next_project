import React from "react";

const Cars = ({carsData}) => {
    const carsDataJSX = carsData.map(item => <div>{item.content}{item.dateOfReceiving}</div>);
    return (
        <div>
          <h1> Cars page</h1>
            {carsDataJSX}
        </div>
    );
};

export default Cars;