export interface ValidationResult {
  valid: boolean;
  errors: {
    french?: string;
    german?: string;
    category?: string;
  };
}

export interface NewCardData {
  french: string;
  german: string;
  category: string;
}

export function validateNewCard(data: NewCardData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  // Validate French field
  if (!data.french.trim()) {
    errors.french = 'French word is required';
  }

  // Validate German field
  if (!data.german.trim()) {
    errors.german = 'German word is required';
  }

  // Validate category field
  if (!data.category.trim()) {
    errors.category = 'Category is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
