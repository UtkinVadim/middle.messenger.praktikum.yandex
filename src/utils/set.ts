import type { Indexed } from '../types/common.d.ts';


export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object') {
    return object;
  }

  let pathParts = path.split('.');
  let current = object as Indexed;

  for (let i = 0; i < pathParts.length; i++) {
    if (i === pathParts.length - 1) {
      current[pathParts[i]] = value;
    } else if (!(pathParts[i] in current)) {
      current[pathParts[i]] = {};
    }

    current = current[pathParts[i]] as Indexed;
  }

  return object;
}
