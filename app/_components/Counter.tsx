"use client";
import { useState } from "react";

export interface IUsers {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export default function Counter({ users }: { users: IUsers[] }) {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
