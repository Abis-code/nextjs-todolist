import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Sign in with Email</button>
    </div>
  );
}
