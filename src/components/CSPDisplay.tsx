import { CSPDirective } from "@/types/game";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CSPDisplayProps {
  directives: CSPDirective[];
}

export const CSPDisplay = ({ directives }: CSPDisplayProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary glow">Content Security Policy</h3>
      <pre className="p-4 rounded-lg bg-card font-mono text-sm overflow-x-auto">
        {directives.map((directive, index) => (
          <div key={directive.name} className="hover:bg-muted p-1 rounded transition-colors">
            <HoverCard>
              <HoverCardTrigger className="cursor-help">
                <span className="text-primary">{directive.name}</span>
                <span className="text-foreground/80"> {directive.value}</span>
                {index < directives.length - 1 && ";"}
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm">{directive.description}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </pre>
    </div>
  );
};