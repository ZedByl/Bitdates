import { format } from "date-fns";

export const formatDate = (inputDate: Date | string | null): string => {
  if (!inputDate) return "Today";

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }; // Опции для форматирования
  const now = new Date();
  const selectedDate = new Date(inputDate);

  now.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  const diffInDays = (selectedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else {
    return selectedDate.toLocaleDateString('en-US', options);
  }
};

export const getNextDateRange = (type: "week" | "month"): { start: string; end: string } => {
  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  if (type === "week") {
    // Определяем день недели (0 - воскресенье, 1 - понедельник и т.д.)
    const currentDay = today.getDay();
    const daysUntilNextMonday = (currentDay === 0 ? 1 : 8 - currentDay); // Считаем дни до следующего понедельника

    // Начало следующей недели (следующий понедельник)
    startDate = new Date(today);
    startDate.setDate(today.getDate() + daysUntilNextMonday);

    // Конец следующей недели (воскресенье)
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  } else if (type === "month") {
    // Начало следующего месяца
    startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Конец следующего месяца
    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  } else {
    throw new Error("Invalid type. Use 'week' or 'month'.");
  }

  return {
    start: formatDateForApi(startDate),
    end: formatDateForApi(endDate),
  };
};

// Преобразуем даты в формат YYYY-MM-DD
export const formatDateForApi = (date: Date | string): string => {
  return format(date, "yyyy-MM-dd");
};
