import { ImArrowUp2 } from "react-icons/im";
import { HiDatabase } from "react-icons/hi";

const Card = (props) => {
  return (
    <div
      className={"card border-0 mycard pt-4 px-3 text-white " + props.bgcolor}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="line_height">
          <h4 className="card_heading text-white">{props.name}</h4>
          <p className="card_number">{props.amount}</p>
        </div>
        <div
          className={
            "rounded-circle d-flex justify-content-center align-items-center " +
            props.bgclass
          }
          style={{ color: props.iconcolor }}
        >
          {props.icon}
        </div>
      </div>
      <p className="text-thin">
        <ImArrowUp2 className="text-white" />
        <span className="text-white">{props.percentage}</span>
        <span> Since last month</span>
      </p>
    </div>
  );
};

export default Card;
