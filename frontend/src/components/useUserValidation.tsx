import { useState, useCallback } from 'react';
import { ERROR_MESSAGES } from '../constants/context';

export interface ValidationErrors {
  account?: string;
  password?: string;
  passwordChk?: string;
  name?: string;
  branchId?: string;
  departmentId?: string;
}

export const useUserValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback((fields: {
    account?: string;
    password?: string;
    passwordChk?: string;
    name?: string;
    branchId?: number;
    departmentId?: number;
  }, isEditMode: boolean = false) => {
    const newErrors: ValidationErrors = {};
    const { account, password, passwordChk, name, branchId, departmentId } = fields;

    const regex = /^[a-zA-Z0-9]+$/;

    if (isSubmitted || account !== undefined) {
      if (!account) {
        newErrors.account = ERROR_MESSAGES.E0013;
      } else if (account.length <= 5 || account.length >= 21 || !regex.test(account)) {
        newErrors.account = ERROR_MESSAGES.E0014;
      }
    }

    if (isSubmitted || password !== undefined) {
      if (!password && !isEditMode) {
        newErrors.password = ERROR_MESSAGES.E0016;
      } else if (password && (password.length <= 5 || password.length >= 21 || !regex.test(password))) {
        newErrors.password = ERROR_MESSAGES.E0017;
      }
    }

    if (isSubmitted || passwordChk !== undefined || passwordChk === '') {
      if (!passwordChk && !isEditMode) {
        newErrors.passwordChk = ERROR_MESSAGES.E0018;
      } else if (password !== passwordChk) {
        newErrors.passwordChk = ERROR_MESSAGES.E0018;
      }
    }

    if (isSubmitted || name !== undefined) {
      if (!name) {
        newErrors.name = ERROR_MESSAGES.E0019;
      } else if (name.length >= 11) {
        newErrors.name = ERROR_MESSAGES.E0020;
      }
    }

    if (isSubmitted || branchId !== undefined) {
      if (!branchId) {
        newErrors.branchId = ERROR_MESSAGES.E0021;
      }
    }

    if (isSubmitted || departmentId !== undefined) {
      if (!departmentId) {
        newErrors.departmentId = ERROR_MESSAGES.E0022;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },[isSubmitted]);

  const submitValidation = useCallback((fields: {
    account?: string;
    password?: string;
    passwordChk?: string;
    name?: string;
    branchId?: number;
    departmentId?: number;
  }, isEditMode: boolean = false) => {
    setIsSubmitted(true);
    return validate(fields, isEditMode);
  }, [validate]);

  return { errors, validate, submitValidation, setErrors };

}