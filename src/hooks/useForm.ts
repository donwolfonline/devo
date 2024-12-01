import { useState } from 'react';
import { z } from 'zod';

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
}

export function useForm<T>({ schema, onSubmit }: UseFormOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      // Handle arrays (like technologies)
      Object.keys(data).forEach(key => {
        if (key.endsWith('[]')) {
          const values = formData.getAll(key);
          const cleanKey = key.slice(0, -2);
          data[cleanKey] = values;
          delete data[key];
        }
      });

      const validatedData = schema.parse(data);
      await onSubmit(validatedData as T);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Form submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    errors,
    isSubmitting,
  };
}
