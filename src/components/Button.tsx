  interface ButtonProps {
    BtnName: string;
    onClick: () => void;
    className?: string;
  }
  const Button: React.FC<ButtonProps> = ({ BtnName, onClick, className }) => {
    return (
      <button onClick={onClick} className={`px-4 border border-black rounded-full ${className}`}>
        {BtnName}
      </button>
    );
  };

  export default Button;