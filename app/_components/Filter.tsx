"use client";

import FilterButton from "@/app/_components/FilterButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: "all" | "small" | "medium" | "large") {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter="all"
        handleFilter={() => handleFilter("all")}
        activeFilter={activeFilter}
      >
        All cabins
      </FilterButton>

      <FilterButton
        filter="small"
        handleFilter={() => handleFilter("small")}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>

      <FilterButton
        filter="medium"
        handleFilter={() => handleFilter("medium")}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>

      <FilterButton
        filter="large"
        handleFilter={() => handleFilter("large")}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </FilterButton>
    </div>
  );
}
