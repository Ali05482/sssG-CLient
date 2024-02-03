const MatrixButtonRenderer = (props) => {
  const handleButtonClick = (value) => {
    console.log("Button clicked with value:", value);
  };

  return (
    <div>
      {props.question.columns.map((col) => (
        <button key={col.value} onClick={() => handleButtonClick(col.text)}>
          {col.text}
        </button>
      ))}
    </div>
  );
};

export default MatrixButtonRenderer;
