import React from "react";

const CategorySelector = ({ setCategory }) => {
  return (
    <div>
      <button onClick={() => setCategory("Tech")}>Tech</button>
      <button onClick={() => setCategory("Business")}>Business</button>
    </div>
  );
};

export default CategorySelector;
