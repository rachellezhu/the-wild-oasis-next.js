import { EyeSlashIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/app/_components/TextExpander";
import { TCabin } from "@/app/_types/cabin-type";
import Image from "next/image";

export default function Cabin({ cabin }: { cabin: TCabin }) {
  const { name, description, max_capacity, image_url } = cabin;
  return (
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

        <p className="text-lg text-primary-300 mb-10">
          {description && <TextExpander>{description}</TextExpander>}
        </p>

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
  );
}
