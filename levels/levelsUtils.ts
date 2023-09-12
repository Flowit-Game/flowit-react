export enum levelStatus {
  unlocked = "unlocked",
  locked = "locked",
  complete = "complete",
}

export type packChoices = "Easy" | "Medium" | "Hard" | "Community"

export type levelProgressProps = {status: levelStatus, best: number | null }