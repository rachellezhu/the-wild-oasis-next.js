import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/cabin-services";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = (await params).cabinId;
  const { name } = await getCabin(Number(cabinId));

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = (await params).cabinId;
  const cabin = await getCabin(Number(cabinId));
  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
