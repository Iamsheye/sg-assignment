import { redirect } from "next/navigation";

export default function Home() {
  redirect("/vacancy");
  return <div></div>;
}
