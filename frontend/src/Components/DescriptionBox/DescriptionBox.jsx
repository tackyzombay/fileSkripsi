import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = ({product}) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
      </div>
      <div className="descriptionbox-description">
      {
          // props.description.map((desc)=>(
          //   <div>
          //     <p>{desc.description}</p>
          //   </div>
          // ))
          <p>{product.description}</p>
      }
      </div>
    </div>
  );
};

export default DescriptionBox;
