export interface Stats {
  correctCount: number;
  incorrectCount: number;
}

export function updateStats(
  stats: Stats,
  result: 'correct' | 'wrong',
): Stats {
  if (result === 'correct') {
    return { ...stats, correctCount: stats.correctCount + 1 };
  }
  return { ...stats, incorrectCount: stats.incorrectCount + 1 };
}

export function calculateAccuracy(stats: Stats): number {
  const total = stats.correctCount + stats.incorrectCount;
  if (total === 0) return 0;
  return Math.round((stats.correctCount / total) * 100);
}
