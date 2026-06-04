export function capitalizeString(value: string): string {
  return value
    .split("")
    .map((item, index) => {
      if (index === 0) {
        return item.toUpperCase();
      }

      return item;
    })
    .join("");
}

export function convertNumberToCurrency(value: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatted.format(value);
}
