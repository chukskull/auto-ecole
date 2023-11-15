import { cleanPhoneNumber } from "./cleanPhoneNumber";
import { pascalCaseTransformer as pascal } from "./pascalCaseTransformer";

export type CreateNewCredentialsOptions = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  cin?: string;
  isInstructor?: boolean;
};

export type Credentials = {
  username: string;
  password: string;
};

/**
 * Student/Other Credentials:
 *
 * username: <lastName>_<phoneNumber>
 * password: <lastName>@<cin>_student
 */

/**
 * Instructor Credentials:
 *
 * username: <lastName>_<phoneNumber>
 * password: <lastName>@<firstName>_instructor
 */

export const createNewCredentials = (
  options?: CreateNewCredentialsOptions,
): Credentials => {
  if (!options)
    return {
      username: "",
      password: "",
    };

  const {
    firstName = "",
    lastName = "",
    phoneNumber = "",
    cin = "",
    isInstructor = false,
  } = options;

  return {
    username: `${pascal(lastName)}_${cleanPhoneNumber(phoneNumber)}`,
    password: `${pascal(lastName)}@${
      !isInstructor ? pascal(cin) : pascal(firstName)
    }_${isInstructor ? "instructor" : "student"}`,
  };
};
