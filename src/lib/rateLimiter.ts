const windows = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  const hits = windows.get(key) ?? [];
  // drop old timestamps
  const recent = hits.filter(ts => ts > windowStart);

  if (recent.length >= limit) {
    const oldest = recent[0];
    return {
      allowed: false,
      remaining: 0,
      resetAfterMs: Math.max(0, windowMs - (now - oldest))
    };
  }

  // record this hit
  recent.push(now);
  windows.set(key, recent);

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    resetAfterMs: windowMs
  };
}

export function resetRateLimit(key: string) {
  windows.delete(key);
}

export function clearAllRateLimits() {
  windows.clear();
}
