import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { validateNewCard } from '../../utils/validateNewCard';
import type { Flashcard } from '../../types/flashcard';
import styles from './CardsPage.module.css';

interface EditState {
  french: string;
  german: string;
  category: string;
}

export function CardsPage() {
  const { cards, editCard, removeCard } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState>({ french: '', german: '', category: '' });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const startEdit = (card: Flashcard) => {
    setEditingId(card.id);
    setEditState({ french: card.french, german: card.german, category: card.category });
    setEditErrors({});
    setConfirmDeleteId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditErrors({});
  };

  const saveEdit = async () => {
    const result = validateNewCard(editState);
    if (!result.valid) {
      setEditErrors(result.errors);
      return;
    }
    setIsSaving(true);
    await editCard(editingId!, {
      french: editState.french.trim(),
      german: editState.german.trim(),
      category: editState.category.trim().toLowerCase(),
    });
    setIsSaving(false);
    setEditingId(null);
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
    setEditingId(null);
  };

  const confirmDelete = async (id: string) => {
    setDeletingId(id);
    await removeCard(id);
    setDeletingId(null);
    setConfirmDeleteId(null);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Cards</h1>
      <p className={styles.count}>{cards.length} card{cards.length !== 1 ? 's' : ''}</p>

      {cards.length === 0 && (
        <p className={styles.empty}>No cards yet. Add some from the Add Card page.</p>
      )}

      <div className={styles.list}>
        {cards.map((card) => (
          <div key={card.id} className={styles.row}>
            {editingId === card.id ? (
              <div className={styles.editForm}>
                <div className={styles.editFields}>
                  <div className={styles.editField}>
                    <label className={styles.editLabel}>French</label>
                    <input
                      className={editErrors.french ? styles.inputError : styles.input}
                      value={editState.french}
                      onChange={(e) => setEditState((s) => ({ ...s, french: e.target.value }))}
                    />
                    {editErrors.french && <span className={styles.fieldError}>{editErrors.french}</span>}
                  </div>
                  <div className={styles.editField}>
                    <label className={styles.editLabel}>German</label>
                    <input
                      className={editErrors.german ? styles.inputError : styles.input}
                      value={editState.german}
                      onChange={(e) => setEditState((s) => ({ ...s, german: e.target.value }))}
                    />
                    {editErrors.german && <span className={styles.fieldError}>{editErrors.german}</span>}
                  </div>
                  <div className={styles.editField}>
                    <label className={styles.editLabel}>Category</label>
                    <input
                      className={editErrors.category ? styles.inputError : styles.input}
                      value={editState.category}
                      onChange={(e) => setEditState((s) => ({ ...s, category: e.target.value }))}
                    />
                    {editErrors.category && <span className={styles.fieldError}>{editErrors.category}</span>}
                  </div>
                </div>
                <div className={styles.editActions}>
                  <button className={styles.saveBtn} onClick={saveEdit} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button className={styles.cancelBtn} onClick={cancelEdit} disabled={isSaving}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : confirmDeleteId === card.id ? (
              <div className={styles.confirmRow}>
                <span className={styles.confirmText}>
                  Delete <strong>{card.french}</strong> / <strong>{card.german}</strong>?
                </span>
                <div className={styles.confirmActions}>
                  <button
                    className={styles.deleteConfirmBtn}
                    onClick={() => confirmDelete(card.id)}
                    disabled={deletingId === card.id}
                  >
                    {deletingId === card.id ? 'Deleting...' : 'Yes, delete'}
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.cardRow}>
                <span className={styles.cell}>{card.french}</span>
                <span className={styles.separator}>→</span>
                <span className={styles.cell}>{card.german}</span>
                <span className={styles.categoryBadge}>{card.category}</span>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => startEdit(card)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteClick(card.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
