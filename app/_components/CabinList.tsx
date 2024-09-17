// import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { Cabin, CabinFilter } from "@/app/types/cabin";

interface CabinListProps {
  filter: CabinFilter;
}

async function CabinList({ filter }: CabinListProps) {
  // noStore();
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  const filters: Record<CabinFilter, (cabin: Cabin) => boolean> = {
    all: () => true,
    small: (cabin: Cabin) => cabin.maxCapacity <= 3,
    medium: (cabin: Cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    large: (cabin: Cabin) => cabin.maxCapacity >= 8,
  };

  const displayedCabins = cabins.filter(filters[filter]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
