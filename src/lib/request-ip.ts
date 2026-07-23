import { createHash } from "crypto";
import { headers } from "next/headers";

/**
 * Obtém um identificador opaco do cliente para rate limit.
 * Não registra IP em logs; a chave retornada é um hash.
 */
export async function getDemandRateLimitKey() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headerStore.get("x-real-ip")?.trim();
  const cfIp = headerStore.get("cf-connecting-ip")?.trim();
  const raw = forwarded || realIp || cfIp || "unknown";

  return createHash("sha256").update(`demand-form:${raw}`).digest("hex").slice(0, 32);
}
