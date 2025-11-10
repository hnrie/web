// A simple in-memory store for pages.
// Note: Data will be lost on server restart.

interface PageStore {
  [id: string]: string;
}

export const pages: PageStore = {};