import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/cabin-services";
import { notFound } from "next/navigation";
// import { unstable_noStore } from "next/cache";

export default async function CabinList({ filter }: { filter: string }) {
  // unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;

  switch (filter) {
    case "all":
      displayedCabins = cabins;
      break;
    case "small":
      displayedCabins = cabins.filter((cabin) => cabin.max_capacity! <= 3);
      break;
    case "medium":
      displayedCabins = cabins.filter(
        (cabin) => cabin.max_capacity! >= 4 && cabin.max_capacity! <= 7
      );
      break;
    case "large":
      displayedCabins = cabins.filter((cabin) => cabin.max_capacity! >= 8);
      break;
    default:
      notFound();
  }

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14
"
    >
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
