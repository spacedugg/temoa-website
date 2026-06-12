import { redirect } from "next/navigation";

// Aktueller Arbeitsstand ist Entwurf G — die verworfenen Entwürfe A–F
// liegen nur noch in der Git-History.
export default function Home() {
  redirect("/entwurf-g");
}
