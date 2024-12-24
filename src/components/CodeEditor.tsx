import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface CodeEditorProps {
  onTest: (payload: string) => void;
  isLoading?: boolean;
}

export const CodeEditor = ({ onTest, isLoading }: CodeEditorProps) => {
  const [code, setCode] = useState("");

  return (
    <motion.div 
      className="w-full space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your XSS payload here..."
        className="font-mono h-32 code-editor"
        disabled={isLoading}
      />
      <Button 
        onClick={() => onTest(code)}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing Payload...
          </>
        ) : (
          'Test Payload'
        )}
      </Button>
    </motion.div>
  );
};