import "../../css/Buttons.css";

const ApplyChange = ({ text, type, onClick }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ApplyChange;
