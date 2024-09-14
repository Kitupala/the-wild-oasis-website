interface SpinnerProps {
  text?: string;
}

function Spinner({ text }: SpinnerProps) {
  return (
    <div className="grid items-center justify-center">
      <div className="spinner"></div>
      <p className="text-xl mt-2 text-primary-200">{text}</p>
    </div>
  );
}

export default Spinner;
