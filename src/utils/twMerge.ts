export default function twMerge(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
