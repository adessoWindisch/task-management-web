// erstelle Funktionen, die verschiedene Datums-, Jahres- und Monatsberechnungen durchführen
export function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthStart(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

