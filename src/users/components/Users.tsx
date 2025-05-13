import { useForm } from 'react-hook-form';

export default function Users() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all' });

  // Form submission handler
  const onSubmit = () => {
    console.log('qwe');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder='Enter name'
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
      />
      {errors.name && <p>{errors.name.message as string}</p>}

      <input
        type='email'
        placeholder='Enter email'
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && <p>{errors.email.message as string}</p>}

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
