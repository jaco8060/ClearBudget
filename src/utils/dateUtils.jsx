// Function to check if a given date string is within the current week (Sunday - Saturday)
export function isDateInCurrentWeek(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  // Get the end of the current week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
}

export function getDaysLeftInCurrentWeek() {
  const today = new Date();
  return 6 - today.getDay();
}

export function getStartOfWeek(dateString) {
  const date = new Date(dateString);
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}
