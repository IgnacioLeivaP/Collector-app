export type ConditionOption = {
  id: string;
  label: string;
  description: string;
};

export const conditionOptions: ConditionOption[] = [
  {
    id: 'mint',
    label: 'Mint',
    description: 'Brand new or unopened, like it just arrived from the factory.',
  },
  {
    id: 'near-mint',
    label: 'Near Mint',
    description: 'Almost perfect condition with only the smallest signs of handling.',
  },
  {
    id: 'excellent',
    label: 'Excellent',
    description: 'Very well preserved with minimal wear, fully functional.',
  },
  {
    id: 'good',
    label: 'Good',
    description: 'Normal wear from use, still complete and in good working order.',
  },
  {
    id: 'fair',
    label: 'Fair',
    description: 'Noticeable signs of wear or defects, still usable but shows age.',
  },
  {
    id: 'poor',
    label: 'Poor',
    description: 'Heavy wear or damage; sold as-is for collection or repair.',
  },
];
