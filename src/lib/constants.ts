export enum CollectionColors {
  sunset = 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
  puppy = 'bg-gradient-to-r from-rose-500 to-red-500',
  rosebud = 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
  snowflake = 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white',
  candy = 'bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 text-white',
  firtree = 'bg-gradient-to-r from-emerald-500 to-emerald-900 text-white',
  metal = 'bg-gradient-to-r from-slate-500 to-slate-800 text-white',
  powder = 'bg-gradient-to-r from-violet-500 to-pink-500 text-white',
}

export type CollectionColor = keyof typeof CollectionColors;
