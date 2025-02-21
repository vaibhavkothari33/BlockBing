import { createClient } from '@livepeer/react-core';

const livepeerClient = createClient({
  apiKey: import.meta.env.VITE_LIVEPEER_API_KEY,
});

export { livepeerClient }; 