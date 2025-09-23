import { useNavigate } from "react-router-dom";
import "../../css/Buttons.css";

const Button = ({ text, route, type }) => {
  const navigate = useNavigate();

  return (
    <button className={`btn ${type} `} onClick={() => navigate(route)}>
      {text}
    </button>
  );
};

export default Button;
