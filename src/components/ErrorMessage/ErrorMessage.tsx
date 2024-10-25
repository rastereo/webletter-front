import "./ErrorMessage.css"

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h1>
        {message}
      </h1>
    </div>
  );
}

export default ErrorMessage;
