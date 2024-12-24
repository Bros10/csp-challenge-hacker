import { Level } from "@/types/game";

export const levels: Level[] = [
  {
    id: 1,
    title: "Basic CSP",
    description: "Let's start with a simple CSP that only allows inline scripts. Can you bypass it?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "script-src",
        value: "'self' 'unsafe-inline'",
        description: "Allows scripts from same origin and inline scripts"
      }
    ],
    hint: "Think about how 'unsafe-inline' affects script execution...",
    solution: "<script>alert(1)</script>"
  },
  {
    id: 2,
    title: "No Inline Scripts",
    description: "This time inline scripts are blocked. How can we still execute JavaScript?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "script-src",
        value: "'self'",
        description: "Only allows scripts from the same origin"
      }
    ],
    hint: "Look for other ways to execute JavaScript without inline scripts..."
  },
  {
    id: 3,
    title: "Strict CSP",
    description: "Now we're using a stricter CSP with nonces. Can you find a way around it?",
    csp: [
      {
        name: "default-src",
        value: "'none'",
        description: "Blocks all resources by default"
      },
      {
        name: "script-src",
        value: "'self' 'nonce-random123'",
        description: "Only allows scripts from same origin and with correct nonce"
      }
    ],
    hint: "Is there a way to reuse existing scripts on the page?"
  }
];