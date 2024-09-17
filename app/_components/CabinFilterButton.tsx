interface CabinFilterButtonProps {
  filter: string;
  activeFilter: string;
  handleFilter: (filter: string) => void;
  children: React.ReactNode;
}

function CabinFilterButton({
  filter,
  activeFilter,
  handleFilter,
  children,
}: CabinFilterButtonProps) {
  return (
    <button
      className={`py-2 px-5 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default CabinFilterButton;
