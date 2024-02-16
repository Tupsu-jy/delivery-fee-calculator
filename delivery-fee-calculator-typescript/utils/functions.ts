import { Weekday, DeliveryTimeOption } from "@/types/enums"
import { DeliveryFeeRequestData } from "@/types/models";

export const getISOFormattedDeliveryTime = (
  selectedDay: Weekday,
  selectedTime: string,
  deliveryTimeOption: DeliveryTimeOption
): string => {
  const currentDate = new Date();
  if (deliveryTimeOption === DeliveryTimeOption.Later) {
    if (selectedDay === Weekday.Tomorrow) {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (selectedDay !== Weekday.Today) {
      const daysOfWeek = [
        Weekday.Sunday,
        Weekday.Monday,
        Weekday.Tuesday,
        Weekday.Wednesday,
        Weekday.Thursday,
        Weekday.Friday,
        Weekday.Saturday,
      ];
      let dayIndex = daysOfWeek.indexOf(selectedDay);
      let currentDayIndex = currentDate.getDay();
      let daysToAdd = (dayIndex + 7 - currentDayIndex) % 7;
      if (daysToAdd === 0) {
        // If selectedDay is today, move to next week's selectedDay
        daysToAdd = 7;
      }
      currentDate.setDate(currentDate.getDate() + daysToAdd);
    }
    // Set hours and minutes from selectedTime
    const [hours, minutes] = selectedTime.split(':').map(Number);
    currentDate.setHours(hours, minutes, 0, 0); // Set seconds and milliseconds to 0
  }

  // Format date and time components to ISO format
  const pad = (num: number): string => String(num).padStart(2, '0');
  const year: number = currentDate.getFullYear();
  const month: string = pad(currentDate.getMonth() + 1);
  const day: string = pad(currentDate.getDate());
  const hour: string = pad(currentDate.getHours());
  const minute: string = pad(currentDate.getMinutes());
  const second: string = pad(currentDate.getSeconds());

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

export const getWeekdaysExcludingTodayAndTomorrow = (): Weekday[] => {
  const currentDate = new Date();
  const todayIndex = currentDate.getDay(); // Sunday has index 0
  const tomorrowIndex = (todayIndex + 1) % 7;

  const daysToExclude = new Array<Weekday>(2);

  const indices = [todayIndex, tomorrowIndex];

  for (let i = 0; i < indices.length; i++) {
    switch (indices[i]) {
      case 0:
        daysToExclude[i] = Weekday.Sunday;
        break;
      case 1:
        daysToExclude[i] = Weekday.Monday;
        break;
      case 2:
        daysToExclude[i] = Weekday.Tuesday;
        break;
      case 3:
        daysToExclude[i] = Weekday.Wednesday;
        break;
      case 4:
        daysToExclude[i] = Weekday.Thursday;
        break;
      case 5:
        daysToExclude[i] = Weekday.Friday;
        break;
      case 6:
        daysToExclude[i] = Weekday.Saturday;
        break;
      default:
        // This should never happen since the index is always between 0 and 6
        break;
    }
  }

  // Filter out the days to exclude
  const weekdays = Object.values(Weekday);
  const filteredWeekdays = weekdays.filter(
    day => !daysToExclude.includes(day)
  );

  return filteredWeekdays;
};

export const transformCalculatorInputToDeliveryFeeRequestData = ({
  selectedDay,
  selectedTime,
  deliveryTimeOption,
  cartValue,
  deliveryDistance,
  numberOfItems,
}: {
  selectedDay: Weekday;
  selectedTime: string;
  deliveryTimeOption: DeliveryTimeOption;
  cartValue: string;
  deliveryDistance: string;
  numberOfItems: string;
}): DeliveryFeeRequestData => {
  const time = getISOFormattedDeliveryTime(
    selectedDay,
    selectedTime,
    deliveryTimeOption
  );

  const processedCartValue = cartValue.replace(',', '.');
  const cartValueInCents = processedCartValue
    ? Math.round(parseFloat(processedCartValue) * 100)
    : 0;

  // Ensure deliveryDistance and numberOfItems are numbers
  const distance = parseInt(deliveryDistance, 10);
  const items = parseInt(numberOfItems, 10);

  return {
    cartValue: cartValueInCents,
    deliveryDistance: distance,
    numberOfItems: items,
    time,
  };
};
