import React from "react";
import "./Order.css";
const order = (props) => {
  const ingredients = [];
  for (let ingeredient in props.ingredients) {
    ingredients.push({
      name: ingeredient,
      amount: props.ingredients[ingeredient],
    });
  }
  const ing = ingredients.map((ig, index) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={index}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>Ingredients: {ing}</p>
      <p>Price {Number.parseFloat(props.price.toFixed(2))}</p>
    </div>
  );
};

export default order;
