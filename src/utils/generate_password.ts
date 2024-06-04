import { generate } from "generate-password";

export default (): string => {
  return generate({
    length: 5,
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
};

export const generateAdminPassword = (): string => {
  return generate({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
};
