import { Level } from "@/types/game";
import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LevelInfoProps {
  level: Level;
}

export const LevelInfo = ({ level }: LevelInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary glow">Level {level.id}: {level.title}</h2>
        {level.hint && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{level.hint}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="text-foreground/80">{level.description}</p>
    </div>
  );
};