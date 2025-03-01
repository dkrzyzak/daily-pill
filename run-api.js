const concurrently = require('concurrently');

concurrently([
    { command: 'cd api/api-gateway && pnpm dev', name: "GATE", prefixColor: 'magenta' },
    { command: 'cd api/auth-service && pnpm dev', name: "AUTH", prefixColor: 'yellow' },
    { command: 'cd api/medicine-service && pnpm dev', name: "MEDS", prefixColor: 'blue' },
]);
