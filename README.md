# diff-by

[![CircleCI](https://circleci.com/gh/maticzav/diff-by.svg?style=shield)](https://circleci.com/gh/maticzav/diff-by)
[![npm version](https://badge.fury.io/js/diff-by.svg)](https://badge.fury.io/js/diff-by)

> Calculate changes in the array of objects.

## Example

```ts
const fn = e => e.id

const oldDefinitions = [
  {
    id: 1,
    name: 'mathew',
    language: 'typescript',
  },
  {
    id: 2,
    name: 'joahim',
    language: 'elm',
  },
  {
    id: 3,
    name: 'georgio',
    language: 'javascript',
  },
  {
    id: 4,
    name: 'stella',
    language: 'python',
  },
]

const newDefinitions = [
  {
    id: 1,
    name: 'mathew',
    language: 'haskell',
  },
  {
    id: 2,
    name: 'joahim',
    language: 'elm',
  },
  {
    id: 4,
    name: 'kayle',
    language: 'c',
  },
]

expect(diffBy(fn, oldDefinitions, newDefinitions)).toEqual({
  created: [
    {
      id: 4,
      name: 'kayle',
      language: 'c',
    },
  ],
  updated: [
    {
      id: 1,
      name: 'mathew',
      language: 'haskell',
    },
  ],
  deleted: [
    {
      id: 3,
      name: 'georgio',
      language: 'javascript',
    },
  ],
  unchanged: [
    {
      id: 2,
      name: 'joahim',
      language: 'elm',
    },
  ],
})
```

## API

```ts
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
): {
  created: T[]
  updated: T[]
  deleted: T[]
  unchanged: T[]
}
```

## License

MIT @ Matic Zavadlal
