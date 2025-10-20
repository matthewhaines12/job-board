import "../../css/Buttons.css";

const ApplyChange = ({ text, type, onClick, filters }) => {
  const handleClick = () => {
    console.log("Applying filters:", filters);
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
