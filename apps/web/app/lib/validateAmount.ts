import { toast } from "sonner";

/**
 * Validates a customer’s payment amount against rules returned by the bill validation API.
 *
 * The API provides an `amount` (reference value) and an `amountType` (rule).
 * This function checks whether the customer’s entered amount satisfies the rule.
 *
 * Amount type rules:
 *  - 0 (None): Any positive amount can be paid.
 *  - 1 (Minimum): Amount must be >= expected.
 *  - 2 (Greater than Minimum): Amount must be > expected.
 *  - 3 (Maximum): Amount must be <= expected.
 *  - 4 (Less than Maximum): Amount must be < expected.
 *  - 5 (Exact): Amount must equal expected.
 *
 * @param customerAmount - The amount the customer is attempting to pay (in minor units).
 * @param expectedAmount - The reference amount returned by the API (in minor units).
 * @param amountType - The rule type (0–5) determining how to validate the amount.
 * @returns true if the customerAmount is valid according to the rule, false otherwise.
 * @url https://docs.interswitchgroup.com/docs/customervalidations
 */
export function validateAmount(
  customerAmount: number,
  expectedAmount: number | null,
  amountType: number
) {
  if (expectedAmount == null) return;

  switch (amountType) {
    case 0: // None → Any amount can be paid
      return;

    case 1: // Minimum → Must be >= expected
      if (customerAmount >= expectedAmount) {
        toast.error(
          `amount must be greater or equal to ${Math.round(expectedAmount / 100)}`
        );
      }
      break;

    case 2: // Greater than Minimum → Must be > expected
      if (customerAmount > expectedAmount) {
        toast.error(
          `amount must be greater than ${Math.round(expectedAmount / 100)}`
        );
      }
      break;

    case 3: // Maximum → Must be <= expected
      if (customerAmount <= expectedAmount) {
        toast.error(
          `amount must be less than or equal to ${Math.round(expectedAmount / 100)}`
        );
      }
      break;

    case 4: // Less than Maximum → Must be < expected
      if (customerAmount < expectedAmount) {
        toast.error(
          `amount must be less than ${Math.round(expectedAmount / 100)}`
        );
      }
      break;

    case 5: // Exact → Must equal expected
      if (customerAmount !== expectedAmount) {
        toast.error(
          `amount must be equal to ${Math.round(expectedAmount / 100)}`
        );
      }
      break;

    default: // Unknown type
      toast.error("Cannot validate amount");
  }
}
