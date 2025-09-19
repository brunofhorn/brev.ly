export function cx(...list: Array<string | false | undefined>) {
  return list.filter(Boolean).join(" ");
}
