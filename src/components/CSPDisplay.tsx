import { CSPDirective } from "@/types/game";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from "framer-motion";

interface CSPDisplayProps {
  directives: CSPDirective[];
}

export const CSPDisplay = ({ directives }: CSPDisplayProps) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-primary glow">Content Security Policy</h3>
      <pre className="p-4 rounded-lg bg-card font-mono text-sm overflow-x-auto">
        {directives.map((directive, index) => (
          <motion.div 
            key={directive.name} 
            className="hover:bg-muted p-1 rounded transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
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
          </motion.div>
        ))}
      </pre>
    </motion.div>
  );
};