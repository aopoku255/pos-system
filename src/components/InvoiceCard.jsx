import React, { useRef } from "react";

const InvoiceCard = (props) => {
  const handleClick = () => {};

  return (
    <div key={props.key}
      onSelect={props.handleSelect}
      className="card border-0 rounded invoice-card shadow"
      onClick={props.handleClick}
      onFocus={props.handleFocus}
    >
      <input
        type="checkbox"
        name=""
        id=""
        className="card_select check mt-1 mb-2 mx-2"
        onChange={props.handleChange}
      />
      <img
        src={props.product_img}
        alt=""
        width={100}
        className="d-block mx-auto mt-4"
        style={{
          pointerEvents: "none",
          aspectRatio: "3 / 2",
          width: "75%",
          objectFit: "contain",
          mixBlendMode: "darken",
        }}
      />
      <div className="d-flex justify-content-between align-items-center mx-2 mt-3">
        <h1 className="" style={{ fontSize: "10px", fontWeight: "bold" }}>
          {props.product_name}
        </h1>
        <h6 style={{ fontSize: "10px", color: "#42CB91" }}>GH₵{props.price}</h6>
      </div>
      <p style={{ lineHeight: 0, fontSize: "10px" }} className="mx-2">
        {props.category}
      </p>
      <h6 className="text-center mt-2" style={{ fontSize: "12px" }}>
        ({props.stock}) Units
      </h6>
      <span className="counter">{props.drug_count}</span>
    </div>
  );
};

export default InvoiceCard;
