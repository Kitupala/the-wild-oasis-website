import { CabinCapacityFilter } from "@/app/types/cabin";

interface CabinFilterButtonProps {
  filter: CabinCapacityFilter;
  activeFilter: CabinCapacityFilter;
  handleFilter: (filter: CabinCapacityFilter) => void;
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
