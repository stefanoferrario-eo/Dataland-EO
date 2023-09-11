import { type AmountWithCurrency } from "@clients/backend";
import { roundNumber } from "@/utils/NumberConversionUtils";

/**
 * Formats a percentage number by multiplying it with 100, rounding it and afterward making it a string with a
 * percent symbol at the end.
 * @param percentageNumber is the percentage number to format
 * @param precision is the precision for the rounding of the percentage number
 * @returns the resulting string
 */
export function formatPercentageNumberAsString(percentageNumber?: number, precision = 2): string {
  if (percentageNumber == undefined) {
    return "";
  }
  return `${roundNumber(percentageNumber * 100, precision)} %`;
}

/**
 * Formats an AmountWithCurrency object by concatenating the amount and the currency.
 * @param amountWithCurrency the object that holds the amount and currency
 * @returns the resulting string from the concatenation
 */
export function formatAmountWithCurrency(amountWithCurrency: AmountWithCurrency): string {
  if (amountWithCurrency?.amount) {
    return `${Math.round(amountWithCurrency.amount).toString()} ${amountWithCurrency.currency ?? ""}`;
  }
  return "";
}
