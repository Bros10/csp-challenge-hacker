import { useState } from "react";
import { levels } from "@/data/levels";
import { CodeEditor } from "@/components/CodeEditor";
import { CSPDisplay } from "@/components/CSPDisplay";
import { LevelInfo } from "@/components/LevelInfo";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const { toast } = useToast();
  const level = levels[currentLevel];

  const handleTestPayload = (payload: string) => {
    // Create a sandbox iframe to test the payload
    const sandbox = document.createElement('iframe');
    sandbox.style.display = 'none';
    document.body.appendChild(sandbox);

    // Set up CSP
    const cspString = level.csp.map(d => `${d.name} ${d.value}`).join('; ');
    
    // Create HTML content with CSP
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Security-Policy" content="${cspString}">
        </head>
        <body>
          ${payload}
        </body>
      </html>
    `;

    // Write content to iframe
    sandbox.srcdoc = html;

    // Listen for alerts (successful XSS)
    window.addEventListener('message', (event) => {
      if (event.data === 'xss-success') {
        toast({
          title: "Success!",
          description: "You've completed this level!",
          className: "bg-primary text-primary-foreground",
        });
        
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(prev => prev + 1);
        }
      }
    }, { once: true });

    // Clean up
    setTimeout(() => {
      document.body.removeChild(sandbox);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-background matrix-bg">
      <div className="container py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <LevelInfo level={level} />
          <CSPDisplay directives={level.csp} />
          <CodeEditor onTest={handleTestPayload} />
        </div>
      </div>
    </div>
  );
};

export default Index;