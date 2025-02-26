export const Button = ({ children, className = "", onClick, ...props }) => {
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  