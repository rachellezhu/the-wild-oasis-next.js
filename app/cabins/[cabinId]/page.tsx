import { getCabin } from "@/app/_lib/cabin-services";
import { EyeSlashIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = (await params).cabinId;
  const { name } = await getCabin(Number(cabinId));

  return { title: `Cabin ${name}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = (await params).cabinId;
  const cabin = await getCabin(Number(cabinId));
  const { name, max_capacity, image_url, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image_url!}
            fill
            sizes="(max-width: 1536px)"
            alt={`Cabin ${name}`}
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UserIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to&nbsp;
                <span className="font-bold">{max_capacity}&nbsp;guests</span>
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the&nbsp;
                <span className="font-bold">Dolomites</span>&nbsp;(Italy)
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy&nbsp;<span className="font-bold">100%</span>
                &nbsp;guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
