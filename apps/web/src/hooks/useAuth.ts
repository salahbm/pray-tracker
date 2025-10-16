import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = async () => {
    setLoading(true);
    // const { error } = await supabase.auth.signOut();
    setLoading(false);

    // if (error) setError(error.message);
    // else router.push('/');
  };

  return { signOut, loading, error };
}
