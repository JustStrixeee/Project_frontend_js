export function Message({ title, text, buttonText, onButtonClick }) {
  return (
    <div className="message">
      <h2>{title}</h2>
      <p>{text}</p>

      {buttonText && (
        <button onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}