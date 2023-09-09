export enum levelStatus {
  unlocked = "unlocked",
  locked = "locked",
  complete = "complete",
}

export const enum levelPacks {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Community = "Community"
}

export type levelProgressProps = {status: levelStatus, best: number | null }