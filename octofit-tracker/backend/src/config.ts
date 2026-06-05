export const PORT = Number(process.env.PORT ?? 8000);
export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
export const CODESPACE_NAME = process.env.CODESPACE_NAME;

export const API_BASE_URL = CODESPACE_NAME
  ? `https://8000-${CODESPACE_NAME}.githubpreview.dev`
  : `http://localhost:${PORT}`;

export const isCodespaces = Boolean(CODESPACE_NAME);
