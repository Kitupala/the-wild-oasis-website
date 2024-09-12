"use client";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Counter({ users }: any) {
  const [count, setCount] = useState(0);
  console.log(users);

  return (
    <>
      <p>There are {users.length} users online.</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </>
  );
}
