import { diffBy } from '../src'

describe('diffBy', () => {
  test('works as expected', async () => {
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
        name: 'stella',
        language: 'python',
      },
    ]

    expect(diffBy(e => e.id, oldDefinitions, newDefinitions)).toEqual({
      created: [
        {
          id: 4,
          name: 'stella',
          language: 'python',
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
  })
})
