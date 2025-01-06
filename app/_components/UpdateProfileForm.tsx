"use client";

import Image from "next/image";

export default function UpdateProfileForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const countryFlag = "https://flagcdn.com/id.svg";

  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label htmlFor="full-name">Full name</label>
        <input
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          type="text"
          id="full-name"
          name="full-name"
          disabled
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          type="email"
          id="email"
          name="email"
          disabled
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
            width="30"
            height="20"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="national-id">National ID number</label>
        <input
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          type="text"
          id="national-id"
          name="national-id"
          disabled
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}
