import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old URL of the history page, now part of "Sobre Nós". Kept so published links still work. */
export const Route = createFileRoute("/historia")({
  beforeLoad: () => {
    throw redirect({ to: "/sobre-nos", statusCode: 301 });
  },
});
