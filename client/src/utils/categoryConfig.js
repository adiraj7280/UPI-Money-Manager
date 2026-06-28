import { UtensilsCrossed, Car, Briefcase, Package } from 'lucide-react'

export const CATEGORY_CONFIG = {
  'Food & Dining': {
    icon       : UtensilsCrossed,
    color      : '#D97706',
    textClass  : 'text-amber-600',
    bgClass    : 'bg-amber-50',
  },
  'Travel': {
    icon       : Car,
    color      : '#0369A1',
    textClass  : 'text-sky-700',
    bgClass    : 'bg-sky-50',
  },
  'Salary': {
    icon       : Briefcase,
    color      : '#15803D',
    textClass  : 'text-green-700',
    bgClass    : 'bg-green-50',
  },
  'Miscellaneous': {
    icon       : Package,
    color      : '#7C3AED',
    textClass  : 'text-violet-700',
    bgClass    : 'bg-violet-50',
  },
}
