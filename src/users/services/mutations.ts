import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Schema } from '../types/schema';
import { createUser } from '../utils/createUser';
import { toast } from 'react-toastify';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { data, error, mutate } = useMutation({
    mutationFn: (data: Schema) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Error creating user');
    },
  });

  return { data, error, mutate };
}
