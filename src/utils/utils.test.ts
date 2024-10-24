import {
  validateEmail,
  removeMask,
  validateDocument,
  validateFullName,
  formatToBrazilianDate,
} from ".";

describe("validateEmail", () => {
  it("should return true for a valid email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("should return false for an invalid email", () => {
    expect(validateEmail("invalid-email")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(validateEmail("")).toBe(false);
  });

  it("should return false for an email without domain", () => {
    expect(validateEmail("test@")).toBe(false);
  });

  it('should return false for an email without "@" symbol', () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });
});

describe("removeMask", () => {
  it("should remove all non-numeric characters", () => {
    expect(removeMask("123.456.789-00")).toBe("12345678900");
  });

  it("should return an empty string if input is empty", () => {
    expect(removeMask("")).toBe("");
  });

  it("should return the same string if there are no non-numeric characters", () => {
    expect(removeMask("12345678900")).toBe("12345678900");
  });
});

describe("validateDocument", () => {
  it("should return true for a valid CPF", () => {
    expect(validateDocument("123.456.789-09")).toBe(true); // Use a valid CPF
  });

  it("should return false for an invalid CPF", () => {
    expect(validateDocument("123.456.789-00")).toBe(false);
  });

  it("should return false for a CPF with all identical digits", () => {
    expect(validateDocument("111.111.111-11")).toBe(false);
  });

  it("should return false for a CPF with less than 11 digits", () => {
    expect(validateDocument("123.456.789")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(validateDocument("")).toBe(false);
  });
});

describe("validateFullName", () => {
  it("should return true for a valid full name", () => {
    expect(validateFullName("John Doe")).toBe(true);
  });

  it("should return false for a name without a space", () => {
    expect(validateFullName("John")).toBe(false);
  });

  it("should return false for a name with less than two letters", () => {
    expect(validateFullName("J")).toBe(false);
  });

  it("should return false if the first character is a number", () => {
    expect(validateFullName("1John Doe")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(validateFullName("")).toBe(false);
  });
});

describe("formatToBrazilianDate", () => {
  it("should format a valid date string to Brazilian format", () => {
    expect(formatToBrazilianDate("2024-03-01")).toBe("01/03/2024");
  });

  it("should return an empty string for an empty input", () => {
    expect(formatToBrazilianDate("")).toBe("");
  });


  it('should throw an error for an invalid date', () => {
    expect(() => formatToBrazilianDate('invalid-date')).toThrow('Invalid date format');
  });
});
