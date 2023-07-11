import * as yup from 'yup';

export * from './math';


export const yupProperLengthValidation = (length: number, message?: yup.Message) => {
  const lengthValidation = [
    'lengthValidation',
    message
      ? message
      : /* eslint-disable indent */
        ({ path }: { path: string }) => {
          return `${path} has a required length of ${length} characters`;
        },
    /* eslint-enable indent */
    (value: string | undefined) => {
      if (
        value &&
        value.length > 0 &&
        (value.length < length || value.length > length)
      ) {
        return false;
      }
      return true;
    },
  ] as const;

  return lengthValidation;
};