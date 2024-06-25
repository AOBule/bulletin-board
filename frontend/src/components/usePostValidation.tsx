import { useState, useCallback } from 'react';
import { ERROR_MESSAGES } from '../constants/context';

interface ValidationErrors {
  title?: string;
  text?: string;
  category?: string;
}


export const usePostValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback((fields: {
    title?: string;
    text?: string;
    category?: string;
  }) => {
    const newErrors: ValidationErrors = {};
    const { title, text, category } = fields;

    if (isSubmitted || title !== undefined) {
      if (!title) {
        newErrors.title = ERROR_MESSAGES.E0006;
      } else if (title.length > 30) {
        newErrors.title = ERROR_MESSAGES.E0009;
      }
    }

    if (isSubmitted || text !== undefined) {
      if (!text) {
        newErrors.text = ERROR_MESSAGES.E0007;
      } else if (text.length > 1000) {
        newErrors.text = ERROR_MESSAGES.E0010;
      }
    }

    if (isSubmitted || category !== undefined) {
      if (!category) {
        newErrors.category = ERROR_MESSAGES.E0008;
      } else if (category.length > 10) {
        newErrors.category = ERROR_MESSAGES.E0011;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [isSubmitted]);

  const postValidation = useCallback((fields: {
    title?: string;
    text?: string;
    category?: string;
  }) => {
    setIsSubmitted(true);
    return validate(fields);
  }, [validate]);

  return { errors, postValidation };
};
