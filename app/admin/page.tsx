import { notFound } from "next/navigation";
import AdminForm from "./AdminForm";

export default function AdminPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <AdminForm />;
}
