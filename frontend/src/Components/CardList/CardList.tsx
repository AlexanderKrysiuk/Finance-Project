import React from "react";
import Card from "../Card/Card";

interface Props {}

const CardList = (props: Props) => {
    return <div>
        <Card companyName="Apple" ticker="AAPL" price={100}/>
        <Card companyName="Microsoft" ticker="MSFT" price={200}/>
        <Card companyName="Tesla" ticker="TSL" price={300}/>
    </div>;
};

export default CardList;