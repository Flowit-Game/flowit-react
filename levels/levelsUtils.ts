export enum levelStatus {
  unlocked = "unlocked",
  locked = "locked",
  complete = "complete",
}

export type levelProgressProps = {status: levelStatus, best: number | null }