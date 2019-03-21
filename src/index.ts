import * as _ from 'lodash'

export interface DiffByResult<T> {
  created: T[]
  updated: T[]
  deleted: T[]
  unchanged: T[]
}

/**
 *
 * Diffs array of objects considering the identifier function.
 *
 * @param fn
 * @param changed
 * @param current
 */
export default function diffBy<T, Y>(
  fn: (e: T) => Y,
  old: T[],
  current: T[],
): DiffByResult<T> {
  return [...current, ...old].reduce<DiffByResult<T>>(
    (acc, el) => {
      const def = current.find(equalsWith(fn)(el))
      const oldDef = old.find(equalsWith(fn)(el))

      if (def && !oldDef) {
        /* new definition */
        return {
          ...acc,
          created: [...acc.created, el],
        }
      } else if (def && oldDef && !_.isEqual(def, oldDef)) {
        /* updated element */
        if (_.isEqual(def, el)) {
          /* update the new one */
          return {
            ...acc,
            updated: [...acc.updated, el],
          }
        } else {
          /* ignore old definition */
          return acc
        }
      } else if (!def && oldDef) {
        /* removed element */
        return {
          ...acc,
          deleted: [...acc.deleted, el],
        }
      } else {
        /* unchanged element */
        if (!acc.unchanged.find(equalsWith(fn)(el))) {
          /* prevent duplicates */
          return {
            ...acc,
            unchanged: [...acc.unchanged, el],
          }
        } else {
          return acc
        }
      }
    },
    {
      created: [],
      updated: [],
      deleted: [],
      unchanged: [],
    },
  )
}

/**
 *
 * Wraps a function to equal.
 *
 * @param fn
 */
function equalsWith<T, Y>(fn: (el: T) => Y): (a: T) => (b: T) => boolean {
  return (a: T) => (b: T) => fn(a) === fn(b)
}

export { diffBy }
