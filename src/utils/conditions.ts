import { ItemCondition, PackagingState } from '../types/collection';

export const CONDITIONS: Record<ItemCondition, string> = {
  'M': 'Mint',
  'NM': 'Near Mint',
  'VG': 'Very Good',
  'G': 'Good',
  'F': 'Fair',
  'P': 'Poor'
};

export const PACKAGING_STATES: Record<PackagingState, string> = {
  'S': 'Sealed',
  'CIB': 'Complete in Box',
  'Boxed': 'Boxed',
  'Loose': 'Loose',
  'N/A': 'Not Applicable'
};