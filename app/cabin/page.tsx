import { EyeSlashIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: "001",
  max_capacity: 2,
  regular_price: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine lines guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image_url:
    "https://kzhoholumyvgzkmyrfzr.supabase.co/storage/v1/object/public/cabin-images/0.025549188208815687-cabin-005.jpg",
};

export default function Page() {
  const {
    id,
    name,
    max_capacity,
    regular_price,
    discount,
    image_url,
    description,
  } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <img src={image_url} alt={`Cabin ${name}`} />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text text-7xl mb-5 translate-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UserIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to{" "}
                <span className="font-bold">{max_capacity} guests</span>
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
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
