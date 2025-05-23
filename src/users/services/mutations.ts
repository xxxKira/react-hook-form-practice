import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../utils/createUser';
import { toast } from 'react-toastify';
import type { Common } from '../../types/apiTypes';
import { updateUser } from '../utils/updateUSer';
import { deleteUser } from '../utils/deleteUser';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: (data: Common) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast(`You're create new user!`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { error, mutate };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: ({ data, id }: { data: Common; id: number }) =>
      updateUser(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast(`You're update user!`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { error, mutate };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'user', { id }] });
      toast(`You're delete user!`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { error, mutate };
}
