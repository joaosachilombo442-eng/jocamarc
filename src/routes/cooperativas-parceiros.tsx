import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old URL of the cooperatives page, now "Cooperativas Integradas". Kept so published links still work. */
export const Route = createFileRoute("/cooperativas-parceiros")({
  beforeLoad: () => {
    throw redirect({ to: "/cooperativas", statusCode: 301 });
  },
});
