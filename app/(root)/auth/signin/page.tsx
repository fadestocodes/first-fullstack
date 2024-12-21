import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignInButtons from "@/components/SignInButtons"; // Import Client Component

export default async function SignInPage() {
  // Fetch the current session
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="px-12 py-20 pt-32 md:px-96  flex flex-col items-center justify-center">
      <SignInButtons />
    </div>
  );
}
