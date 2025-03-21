import { useQuery } from "@tanstack/react-query";
import { useAuthProvider } from "@/context/auth";
import { getUserNotes } from "@/services/notes";

export const useUserNotes = () => {
  const { accessToken } = useAuthProvider();

  const fetchData = async () => {
    if (!accessToken) return [];

    const response = await getUserNotes();
    return response.data?.notes ?? [];
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userNotes", accessToken],
    queryFn: fetchData,
    initialData: [],
  });

  return { data, isLoading, refetch } as const;
};
