import { env } from "@/lib/env";
import type {
  ValidateCustomerProps,
  ValidateCustomerResponse,
} from "@/types/customer";

export async function validateCustomer(
  data: ValidateCustomerProps
): Promise<ValidateCustomerResponse["data"]> {
  const res = await fetch(`${env.apiBaseUrl}/bills/validate-customer`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let json: ValidateCustomerResponse;
  try {
    json = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(json?.message ?? "Failed to validate customer");
  }

  // success code is 90000
  if (json.data.ResponseCode !== "90000") {
    throw new Error(
      json?.data.ResponseDescription ?? "Failed to validate customer"
    );
  }

  return json.data;
}
