import type {LevelData} from "@/components/Game/Game";

export enum levelStatus {
  unlocked = "unlocked",
  locked = "locked",
  complete = "complete",
  optimal = "optimal",
}

export type packChoices = "Easy" | "Medium" | "Hard" | "Community"

export type levelsProps = Record<packChoices, Array<LevelData>>

export type levelProgressProps = {best: number}

// Completed levels keyed by level ID, so progress survives levels being added or reordered
export type progressProps = Record<number, levelProgressProps>

export function getLevelStatus(packLevels: Array<{id: number, optimalMoves: number | null}>, index: number, progress: progressProps): levelStatus {
  const {id, optimalMoves} = packLevels[index]
  if (progress[id]) {
    return optimalMoves !== null && progress[id].best <= optimalMoves ? levelStatus.optimal : levelStatus.complete
  }
  // The first 5 levels are always unlocked, and completing a level unlocks the next 5
  if (index < 5 || packLevels.slice(index - 5, index).some((level) => progress[level.id])) {
    return levelStatus.unlocked
  }
  return levelStatus.locked
}
