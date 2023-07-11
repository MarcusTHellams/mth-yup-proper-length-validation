# Yup Proper Length Validation
This code provides a function for creating  length validation using the Yup library even with empty strings.

### Usage

To use the **yupProperLengthValidation** function, follow these steps:

```ts
	import * as yup from 'yup';
```
Call the yupProperLengthValidation function, passing the desired length and an optional error message:

```ts
	const lengthValidation = yupProperLengthValidation(10, "Custom error message");
```

or

```ts
	const lengthValidation = yupProperLengthValidation(10, ({path})=>{
	return `${path} is not the proper length`
	});
```

Use the resulting lengthValidation in your Yup schema:
```ts
const schema = yup.object().shape({
  myField: yup.string().test(...lengthValidation),
});
```
The lengthValidation variable contains an array with the following elements:

- 'lengthValidation': This is a descriptive name for the validation.
- message: An optional error message that will be displayed if the validation fails. If no message is provided, a default message will be used **OR**
- A function that generates the error message. This function takes an object parameter with a path property and returns a string. The default implementation returns a message indicating the required length.
- A validation function that checks if the value meets the length requirement. It returns true if the value is valid and false otherwise.

### Example
```ts
import * as yup from 'yup';

const yupProperLengthValidation = (length, message) => {
  const lengthValidation = [
    'lengthValidation',
    message
      ? message
      : ({ path }) => {
          return `${path} has a required length of ${length} characters`;
        },
    (value) => {
      if (value && value.length > 0 && (value.length < length || value.length > length)) {
        return false;
      }
      return true;
    },
  ] as const;

  return lengthValidation;
};

const schema = yup.object().shape({
  myField: yup.string().test(...yupProperLengthValidation(10)),
});

schema.validate({ myField: '1234567890' })
  .then(() => console.log('Valid!'))
  .catch((error) => console.error('Invalid:', error));
```
In this example, we define a Yup schema with a myField field that should have a length of 10 characters. If the validation fails, an error will be thrown with the specified error message or the default message.

It would also pass validation with the following code:
```ts
const schema = yup.object().shape({
  myField: yup.string().test(...yupProperLengthValidation(10)),
});

schema.validate({ myField: "" })
  .then(() => console.log('Valid!'))
  .catch((error) => console.error('Invalid:', error));

```

### License
This code is licensed under the MIT License.