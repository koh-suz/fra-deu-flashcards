import { createClient } from '@supabase/supabase-js';
import type { Flashcard } from '../types/flashcard';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ucptiohyuhlfgsilsvcq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch all flashcards from Supabase database
 */
export async function fetchCards(): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('id, french, german, category')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return data.map((row) => ({
      id: row.id,
      french: row.french,
      german: row.german,
      category: row.category,
    }));
  } catch (error) {
    console.error('Failed to fetch cards from Supabase:', error);
    throw new Error('Failed to load flashcards from database');
  }
}

/**
 * Create a new flashcard in Supabase database
 */
export async function createCard(card: Omit<Flashcard, 'id'>): Promise<Flashcard> {
  try {
    // Validate input
    if (!card.french.trim() || !card.german.trim() || !card.category.trim()) {
      throw new Error('All fields are required');
    }

    const { data, error } = await supabase
      .from('flashcards')
      .insert({
        french: card.french.trim(),
        german: card.german.trim(),
        category: card.category.trim(),
      })
      .select('id, french, german, category')
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create card');
    }

    return {
      id: data.id,
      french: data.french,
      german: data.german,
      category: data.category,
    };
  } catch (error) {
    console.error('Failed to create card in Supabase:', error);
    throw new Error('Failed to save flashcard to database');
  }
}

/**
 * Update an existing flashcard (optional - for future use)
 */
export async function updateCard(id: string, updates: Partial<Omit<Flashcard, 'id'>>): Promise<Flashcard> {
  try {
    if (Object.keys(updates).length === 0) {
      throw new Error('No updates provided');
    }

    const { data, error } = await supabase
      .from('flashcards')
      .update(updates)
      .eq('id', id)
      .select('id, french, german, category')
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Card not found');
    }

    return {
      id: data.id,
      french: data.french,
      german: data.german,
      category: data.category,
    };
  } catch (error) {
    console.error('Failed to update card in Supabase:', error);
    throw new Error('Failed to update flashcard in database');
  }
}

/**
 * Delete a flashcard (optional - for future use)
 */
export async function deleteCard(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete card from Supabase:', error);
    throw new Error('Failed to delete flashcard from database');
  }
}
