import React from "react";
import useAuth from "./useAuth.jsx";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  return <div>{code}</div>;
}
