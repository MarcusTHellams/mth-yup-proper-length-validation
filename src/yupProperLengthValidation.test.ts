import * as yup from 'yup';

import { yupProperLengthValidation } from '.';

describe('Testing yupProperLengthValidation suite', () => {
  it('should throw an error and return the standard error message', async () => {
    const zip = yup.string().test(...yupProperLengthValidation(5));
    try {
      await zip.validate('1');
    } catch (error) {
      const err = <yup.ValidationError>error;
      expect(err.errors[0]).toBe('this has a required length of 5 characters');
    }
  });
  it('should throw an error and return custom string error message', async () => {
    const zip = yup
      .string()
      .test(...yupProperLengthValidation(5, 'It is not long enough'));
    try {
      await zip.validate('1');
    } catch (error) {
      const err = <yup.ValidationError>error;
      expect(err.errors[0]).toBe('It is not long enough');
    }
  });
  it('should throw an error and return custom function error message', async () => {
    const zip = yup.string().test(
      ...yupProperLengthValidation(5, ({ path }) => {
        return `${path} is not long enough`;
      })
    );
    try {
      await zip.validate('1');
    } catch (error) {
      const err = <yup.ValidationError>error;
      expect(err.errors[0]).toBe('this is not long enough');
    }
  });

  it('should throw an error if the length is too long', async () => {
    const zip = yup.string().test(...yupProperLengthValidation(1));
    try {
      await zip.validate('1111');
    } catch (error) {
      const err = <yup.ValidationError>error;
      expect(err.errors[0]).toBe('this has a required length of 1 characters');
    }
  });

  it('should not throw an error if passed an empty string', async () => {
    const zip = yup.string().test(...yupProperLengthValidation(5));
    const resp = await zip.validate('');
    expect(resp).toBe('');
  });

  it('should not throw an error if passed null or undefined', async () => {
    const zip = yup
      .string()
      .test(...yupProperLengthValidation(5))
      .notRequired();
    let resp = await zip.validate(null);
    expect(resp).toBeNull();
    resp = await zip.validate(undefined);
    expect(resp).toBeUndefined();
  });
});
