import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";
import { useAuthProvider } from "@/context/auth";

export const useUserProfile = () => {
  const { accessToken, setAccessToken } = useAuthProvider();

  const fetchData = async () => {
    if (!accessToken) return null;
    const response = await getUserProfile();

    if (!response.success && response.error?.statusCode === 401) {
      setAccessToken(null);
      return null;
    }

    return response.data?.user ?? null;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userProfile", accessToken],
    queryFn: fetchData,
    initialData: null,
  });

  return { data, isLoading, refetch } as const;
};
