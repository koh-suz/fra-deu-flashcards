import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import { validateNewCard } from '../../utils/validateNewCard';
import type { NewCardData } from '../../utils/validateNewCard';
import styles from './AddCardPage.module.css';

export function AddCardPage() {
  const { addCard, cards } = useAppContext();
  const existingCategories = Array.from(new Set(cards.map((c) => c.category))).sort();
  const [formData, setFormData] = useState<NewCardData>({
    french: '',
    german: '',
    category: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitError(null);

    const result = validateNewCard(formData);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const newCard = {
      french: formData.french.trim(),
      german: formData.german.trim(),
      category: formData.category.trim().toLowerCase(),
    };

    try {
      setIsSubmitting(true);
      await addCard(newCard);
      setErrors({});
      setSuccess(true);
      setFormData({ french: '', german: '', category: '' });
    } catch {
      setSubmitError('Failed to save card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Add New Card</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="french" className={styles.label}>
            French Word
          </label>
          <input
            type="text"
            id="french"
            value={formData.french}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, french: e.target.value }))
            }
            className={errors.french ? styles.inputError : styles.input}
            placeholder="le chat"
          />
          {errors.french && (
            <span className={styles.error}>{errors.french}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="german" className={styles.label}>
            German Word
          </label>
          <input
            type="text"
            id="german"
            value={formData.german}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, german: e.target.value }))
            }
            className={errors.german ? styles.inputError : styles.input}
            placeholder="die Katze"
          />
          {errors.german && (
            <span className={styles.error}>{errors.german}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <input
            type="text"
            id="category"
            list="category-suggestions"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={errors.category ? styles.inputError : styles.input}
            placeholder="animals"
          />
          <datalist id="category-suggestions">
            {existingCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          {errors.category && (
            <span className={styles.error}>{errors.category}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add Card'}
        </button>

        {submitError && (
          <div className={styles.submitError}>{submitError}</div>
        )}

        {success && (
          <div className={styles.success}>
            ✅ Card added successfully! It will persist after reload.
          </div>
        )}
      </form>
    </div>
  );
}
