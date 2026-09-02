import { redirect } from "next/navigation";

export default function LegacyRegistrationRoute() {
    redirect("/private/authentication?error=invalid_code");
}
