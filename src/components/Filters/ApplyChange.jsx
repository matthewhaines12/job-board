import "../../css/Buttons.css";

const ApplyChange = ({ text, type, onClick }) => {
  const handleClick = () => {
    // Call the search function passed from Home.jsx
    onClick();
  };

  return (
    <button className={`btn ${type}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default ApplyChange;
