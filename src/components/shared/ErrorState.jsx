const ErrorState = ({
  message = "Something went wrong",
  suggestion = "Please try again later.",
}) => {
  return (
    <div className="error-container">
      <h3>{message}</h3>
      <p className="error-suggestion">{suggestion}</p>
    </div>
  );
};

export default ErrorState;
