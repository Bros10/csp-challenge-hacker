import { useState } from "react";
import { levels } from "@/data/levels";
import { CodeEditor } from "@/components/CodeEditor";
import { CSPDisplay } from "@/components/CSPDisplay";
import { LevelInfo } from "@/components/LevelInfo";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const level = levels[currentLevel];

  const handleTestPayload = async (payload: string) => {
    setIsLoading(true);
    console.log("Testing payload:", payload);
    
    try {
      // Create a sandbox iframe to test the payload
      const sandbox = document.createElement('iframe');
      sandbox.style.display = 'none';
      // Add necessary sandbox permissions
      sandbox.sandbox.add('allow-scripts');
      sandbox.sandbox.add('allow-same-origin');
      document.body.appendChild(sandbox);

      // Set up message listener for XSS success
      const messageHandler = (event: MessageEvent) => {
        console.log("Received message:", event.data);
        if (event.data === 'xss-success') {
          console.log("XSS Success detected!");
          handleLevelComplete();
        }
      };
      window.addEventListener('message', messageHandler);

      // Set up CSP
      const cspString = level.csp.map(d => `${d.name} ${d.value}`).join('; ');
      console.log("Applied CSP:", cspString);
      
      // Create HTML content with CSP
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="Content-Security-Policy" content="${cspString}">
          </head>
          <body>
            ${payload}
            <script>
              try {
                // Override alert to communicate success
                window.alert = function() {
                  window.parent.postMessage('xss-success', '*');
                  return true;
                };
                // Also catch console.log attempts
                console.log = function() {
                  window.parent.postMessage('xss-success', '*');
                  return true;
                };
              } catch (e) {
                console.error('Error in sandbox:', e);
              }
            </script>
          </body>
        </html>
      `;

      // Write content to iframe
      const doc = sandbox.contentDocument || sandbox.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }

      // Clean up after 2 seconds
      setTimeout(() => {
        window.removeEventListener('message', messageHandler);
        document.body.removeChild(sandbox);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Error testing payload:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to test payload. Please try again.",
      });
    }
  };

  const handleLevelComplete = () => {
    console.log("Level complete handler triggered");
    // Show success message
    toast({
      title: "Level Complete! 🎉",
      description: "Moving to next level...",
      className: "bg-primary text-primary-foreground",
    });

    // Proceed to next level if available
    if (currentLevel < levels.length - 1) {
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
      }, 1500);
    } else {
      toast({
        title: "Congratulations! 🏆",
        description: "You've completed all levels!",
        className: "bg-primary text-primary-foreground",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background matrix-bg">
      <div className="container py-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LevelInfo level={level} />
          <CSPDisplay directives={level.csp} />
          <CodeEditor onTest={handleTestPayload} isLoading={isLoading} />
          
          <div className="text-sm text-muted-foreground">
            Level Progress: {currentLevel + 1} / {levels.length}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;