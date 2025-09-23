import "server-only";
import { env } from "../env";

export async function getBillingItems() {
  const res = await fetch(`${env.apiBaseUrl}/bills/items`);
  return res.json();
}
