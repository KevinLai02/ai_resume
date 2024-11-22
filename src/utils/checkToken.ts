import { NextRouter } from "next/router";

export const checkToken = (router: NextRouter) => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
};
