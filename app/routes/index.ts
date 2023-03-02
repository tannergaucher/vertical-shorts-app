import { redirect } from "@remix-run/node";

import { Routes } from "~/routes";

export const loader = () => {
  return redirect(Routes.Admin);
};
