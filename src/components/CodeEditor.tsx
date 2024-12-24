import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface CodeEditorProps {
  onTest: (payload: string) => void;
  isLoading?: boolean;
}

export const CodeEditor = ({ onTest, isLoading }: CodeEditorProps) => {
  const [code, setCode] = useState("");

  return (
    <div className="w-full space-y-4">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your XSS payload here..."
        className="font-mono h-32 code-editor"
      />
      <Button 
        onClick={() => onTest(code)}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Test Payload
      </Button>
    </div>
  );
};