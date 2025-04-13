/**
 * Utility function to make fetch requests with CORS headers
 * 
 * @param url - The URL to fetch from
 * @param options - Optional fetch options
 * @returns Promise with fetch response
 */
export async function fetchWithCors(url: string, options: RequestInit = {}) {
  // Choose one of these methods based on what works best for your API:

  // Method 1: Using a CORS proxy
  // const corsProxyUrl = 'https://corsproxy.io/?';
  // return fetch(corsProxyUrl + encodeURIComponent(url), options);

  // Method 2: Using mode: 'cors' with credentials
  return fetch(url, {
    ...options,
    mode: 'cors',
    credentials: 'omit',
    headers: {
      ...options.headers,
      'Accept': 'application/json',
    }
  });

  // Method 3: If neither works, you might need a server-side proxy solution
}

// Base URLs for the blockchain APIs
export const REST_API_URL = 'http://145.223.80.193:1317';
export const RPC_API_URL = 'http://145.223.80.193:26657'; 