import { useQuery } from '@tanstack/react-query';
import { getCities } from '../utils/getCities';
import { getLanguages } from '../utils/getLanguages';
import { getSkills } from '../utils/getSkills';
import { getGenders } from '../utils/getGenders';
import { getUsers } from '../utils/getUsers';

export function useCities() {
  const { data, isPending, error } = useQuery({
    queryKey: ['cities'],
    queryFn: () => getCities(),
  });

  return { data, isPending, error };
}

export function useLanguages() {
  const { data, isPending, error } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  return { data, isPending, error };
}

export function useSkills() {
  const { data, isPending, error } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  return { data, isPending, error };
}

export function useGenders() {
  const { data, isPending, error } = useQuery({
    queryKey: ['genders'],
    queryFn: getGenders,
  });

  return { data, isPending, error };
}

export function useUsers() {
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return { data, isPending, error };
}
