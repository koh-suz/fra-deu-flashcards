export function validateAnswer(userInput: string, correctAnswer: string): boolean {
  // Normalize both strings: trim, lowercase, and normalize whitespace
  const normalize = (str: string): string => {
    return str.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  const normalizedInput = normalize(userInput);
  const normalizedCorrect = normalize(correctAnswer);

  // Empty input fails
  if (normalizedInput === '') {
    return false;
  }

  // Strict match after normalization
  return normalizedInput === normalizedCorrect;
}
