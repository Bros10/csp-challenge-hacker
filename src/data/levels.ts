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
    hint: "Think about how 'unsafe-inline' affects script execution..."
    },
  {
    id: 2,
    title: "Image Events",
    description: "Scripts are blocked, but what about image events?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "script-src",
        value: "'none'",
        description: "Blocks all scripts"
      },
      {
        name: "img-src",
        value: "*",
        description: "Allows images from any source"
      }
    ],
    hint: "Images have event handlers too..."  
  },
  {
    id: 3,
    title: "Base Tag Fun",
    description: "Now we're blocking most things, but what about HTML elements that can affect how resources load?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "script-src",
        value: "'self'",
        description: "Only allows same-origin scripts"
      },
      {
        name: "base-uri",
        value: "*",
        description: "Allows any base URI to be set"
      }
    ],
    hint: "The <base> tag can change where relative URLs load from..."
    }
];