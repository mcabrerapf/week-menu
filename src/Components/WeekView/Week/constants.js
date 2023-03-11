const defaultOptions = {
  days: [
    {
      checked: true, name: 'MON', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: true, name: 'TUE', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: true, name: 'WED', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: true, name: 'THU', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: true, name: 'FRI', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: true, name: 'SAT', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      checked: false, name: 'SUN', hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
  ],
  maxBreakfasts: 3,
  maxLunches: 3,
  maxDinners: 3,
};

const mock = '';

export { defaultOptions, mock };
