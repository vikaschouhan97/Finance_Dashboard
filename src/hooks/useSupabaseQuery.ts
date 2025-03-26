
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export type QueryOptions = {
  queryKey: string[];
  query: string;
  variables?: Record<string, any>;
  enabled?: boolean;
};

export const useSupabaseQuery = <T>({ queryKey, query, variables, enabled = true }: QueryOptions) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('graphql', {
        query,
        variables: variables || {}
      });
      
      if (error) throw new Error(error.message);
      return data as T;
    },
    enabled
  });
};
