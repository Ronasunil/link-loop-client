import { swr } from "@api/swr/Swr";
import useSWR from "swr";

export function useCurrentUser() {
  const { data, isLoading, error } = useSWR("/currentUser", swr.fetcherGet);

  return { user: data?.user || null, isLoading, error };
}
