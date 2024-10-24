export const validateEmail = (email: string = "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!email && emailRegex.test(email);
};

export const validateDocument = (document: string = ""): boolean => {
  if (!document) return false;
  document = document.replace(/\D/g, "");
  if (document.length !== 11 || /^(\d)\1+$/.test(document)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    const sum = base.split("").reduce((acc, num, index) => {
      return acc + parseInt(num) * (factor - index);
    }, 0);
    return ((sum * 10) % 11) % 10;
  };

  const base = document.slice(0, 9);
  const firstCheckDigit = calcCheckDigit(base, 10);
  const secondCheckDigit = calcCheckDigit(
    base + firstCheckDigit.toString(),
    11
  );

  return (
    firstCheckDigit === parseInt(document[9]) &&
    secondCheckDigit === parseInt(document[10])
  );
};

export const validateFullName = (fullName: string = ""): boolean => {
  fullName = fullName.trim();
  const hasSpace = fullName.includes(" ");
  const hasTwoLetters = (fullName.match(/[a-zA-Z]/g) || []).length >= 2;
  const firstCharIsNotNumber = isNaN(parseInt(fullName[0]));
  return hasSpace && hasTwoLetters && firstCharIsNotNumber;
};

export const formatToBrazilianDate = (date: string = "") => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
};
