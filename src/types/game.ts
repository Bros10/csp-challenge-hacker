export interface CSPDirective {
  name: string;
  value: string;
  description: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  csp: CSPDirective[];
  hint?: string;
  solution?: string;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  attempts: number;
}