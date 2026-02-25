/**
 * Simple cookie utility for client-side use.
 */
export const cookies = {
  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const nameLenPlus = name.length + 1;
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.substring(0, nameLenPlus) === `${name}=`)
        .map((c) => decodeURIComponent(c.substring(nameLenPlus)))[0] || null
    );
  },
  set: (name: string, value: string, days = 7) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
  },
  remove: (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  },
};
