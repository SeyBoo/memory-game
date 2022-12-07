import { BaseSyntheticEvent, useState } from 'react';

export function useCustomForm<T>(initialValues: T) {
  const [formValues, setFormValues] = useState({ ...initialValues });

  const handleChange = (e: BaseSyntheticEvent) =>
    setFormValues({
      ...formValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });

  return [formValues, handleChange, setFormValues] as const;
}
