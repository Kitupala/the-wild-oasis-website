"use client";

import CabinFilterButton from "@/app/_components/CabinFilterButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CabinCapacityFilter } from "@/app/types/cabin";

function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter =
    (searchParams.get("capacity") as CabinCapacityFilter) ??
    CabinCapacityFilter.All;

  function handleFilter(filter: CabinCapacityFilter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <CabinFilterButton
        filter={CabinCapacityFilter.All}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </CabinFilterButton>

      <CabinFilterButton
        filter={CabinCapacityFilter.Small}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </CabinFilterButton>

      <CabinFilterButton
        filter={CabinCapacityFilter.Medium}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </CabinFilterButton>

      <CabinFilterButton
        filter={CabinCapacityFilter.Large}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </CabinFilterButton>
    </div>
  );
}

export default CabinFilter;
