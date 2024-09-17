import CabinFilter from "@/app/_components/CabinFilter";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import { CabinCapacityFilter } from "@/app/types/cabin";

// * To revalidate data in cache @ route level / seconds *
// * Useless since searchParams switches page into dynamic rendering*
// export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

const isValidCabinFilter = (
  filter: string | undefined
): filter is CabinCapacityFilter => {
  return Object.values(CabinCapacityFilter).includes(
    filter as CabinCapacityFilter
  );
};

export default function Page({ searchParams }: PageProps) {
  const filter: CabinCapacityFilter = isValidCabinFilter(searchParams?.capacity)
    ? (searchParams.capacity as CabinCapacityFilter)
    : CabinCapacityFilter.All;

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <CabinFilter />
      </div>
      <Suspense
        fallback={<Spinner text="Loading cabin data..." />}
        key={filter}
      >
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
