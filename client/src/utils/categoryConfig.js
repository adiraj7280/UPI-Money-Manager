import { UtensilsCrossed, Car, Briefcase, Package, ShoppingCart, Lightbulb, ShoppingBag, Clapperboard, HeartPulse } from 'lucide-react'

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
  'Groceries': {
    icon       : ShoppingCart,
    color      : '#059669', // Emerald
    textClass  : 'text-emerald-700',
    bgClass    : 'bg-emerald-50',
  },
  'Utilities': {
    icon       : Lightbulb,
    color      : '#CA8A04', // Yellow
    textClass  : 'text-yellow-700',
    bgClass    : 'bg-yellow-50',
  },
  'Shopping': {
    icon       : ShoppingBag,
    color      : '#BE185D', // Pink
    textClass  : 'text-pink-700',
    bgClass    : 'bg-pink-50',
  },
  'Entertainment': {
    icon       : Clapperboard,
    color      : '#9333EA', // Purple
    textClass  : 'text-purple-700',
    bgClass    : 'bg-purple-50',
  },
  'Healthcare': {
    icon       : HeartPulse,
    color      : '#DC2626', // Red
    textClass  : 'text-red-700',
    bgClass    : 'bg-red-50',
  },
  'Miscellaneous': {
    icon       : Package,
    color      : '#64748B', // Slate
    textClass  : 'text-slate-600',
    bgClass    : 'bg-slate-50',
  }
}
