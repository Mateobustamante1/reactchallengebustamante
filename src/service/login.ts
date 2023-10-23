export function validatePatternWithSpecificName(
  password: string,
  name: string
): boolean {
  if (validateLowerCaseNoNumbers(name)) {
    const regex = new RegExp(
      `^[0-9]+${name.charAt(0).toUpperCase()}${name.slice(1)}$`
    );
    return regex.test(password);
  }
  return false;
}

function validateLowerCaseNoNumbers(name: string): boolean {
  const regex = /^[a-z]+$/;
  return regex.test(name);
}
