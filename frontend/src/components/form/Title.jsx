import React from "react";

export default function Title({Children}) {
  return (
    <h1 className=" dark:text-black text-black text-xl font-semibold text-center">{Children}</h1>
  );
}
