# All the Ricks

A small React + TypeScript + Apollo app that queries the public
[Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) for every
character named Rick and every episode with "rick" in the title, then renders
them as Material UI cards.

The app itself is the excuse. The real subject of this repo is **how to mock
Apollo GraphQL queries in Storybook and Jest**, walked through step by step in
ten numbered stories, from no mocking at all to fully schema-driven automatic
mocks and client-only local state.

## The mocking walkthrough

Each story in [`stories/`](stories) wraps the same `<Cards />` component in a
different provider. Read them in order.

| # | Story | Provider | What it demonstrates |
|---|-------|----------|----------------------|
| 0 | `0-InitialStory` | none | Rendering a `useQuery` component with no `ApolloProvider` and watching it fail. |
| 1 | `1-WithClient` | real `ApolloClient` | Hitting the live API from Storybook. Works, but slow, network-bound, and non-deterministic. |
| 2 | `2-MockedProvider` | `MockedProvider` from `@apollo/react-testing` | Hand-written request/response pairs. Exact query matching, no schema needed. |
| 3 | `3-AutoMockedProvider` | [`AutoMockedProvider`](src/utils/AutoMockedProvider.tsx) | Builds an executable schema from the downloaded introspection result and lets `graphql-tools` auto-generate every field. Zero fixtures. |
| 4 | `4-AMPWithMocks` | `AutoMockedProvider` + `mockResolvers` | Overrides specific resolvers while everything else stays auto-mocked. |
| 5 | `5-AMPWithMergedMocks` | [`AutoMockedProviderMerged`](src/utils/AutoMockedProviderMerged.tsx) | Merges a project-wide default resolver map ([`resolvers.tsx`](src/utils/resolvers.tsx)) with per-story overrides via [`mergeResolvers`](src/utils/mergeResolvers.tsx). |
| 6 | `6-LoadingMockedProvider` | [`LoadingMockedProvider`](src/utils/LoadingMockedProvider.tsx) | An `ApolloLink` that never resolves, so the loading state stays on screen. |
| 7 | `7-ErrorMockedProvider` | [`ErrorMockedProvider`](src/utils/ErrorMockedProvider.tsx) | An `ApolloLink` that emits GraphQL errors, so the error state renders. |
| 8 | `8-NoDataMockedProvider` | [`NoDataMockedProvider`](src/utils/NoDataMockedProvider.tsx) | An `ApolloLink` that returns an empty `data` object. |
| 9 | `9-LocalStateProvider` | [`LocalStateProvider`](src/utils/LocalStateProvider.tsx) | Seeds the `InMemoryCache` with faker data and reads it with an `@client` query. No link at all. |

The same providers back the Jest snapshot tests in [`src/`](src), so a
component can be tested and previewed with one set of mocks.

## Getting started

```bash
npm install
```

Run the app against the live API:

```bash
npm start
```

Run Storybook and step through the stories above:

```bash
npm run storybook
```

Run the snapshot tests:

```bash
npm test
```

The dependency set dates from early 2020 (Create React App 3, React 16,
Storybook 5, Apollo Client 2). If `npm install` fails on a current Node
release, try an LTS release from that era, such as Node 14.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm start` | Dev server at http://localhost:3000. |
| `npm test` | Jest in watch mode via `react-scripts`. |
| `npm run build` | Production build into `build/`. |
| `npm run storybook` | Storybook at http://localhost:6006. |
| `npm run build-storybook` | Static Storybook build. |
| `npm run schema:download` | Re-downloads the API's introspection schema with the Apollo CLI. See below. |

## Refreshing the schema

`AutoMockedProvider` and `AutoMockedProviderMerged` build their executable
schema from [`src/utils/schema.json`](src/utils/schema.json). If the upstream
API changes, regenerate it:

```bash
npm run schema:download
```

Note that the script writes to `schema.json` in the repo root. Copy the result
over `src/utils/schema.json`, which is the file the code actually imports.

## Project layout

```
src/
  App.tsx                     Real ApolloClient pointed at the live API
  Cards.tsx                   Characters named Rick
  Episodes.tsx                Episodes with "rick" in the name
  CardsLocal.tsx              Same cards, read from local cache via @client
  *.test.tsx                  Jest snapshot tests using the mock providers
  utils/
    AutoMockedProvider.tsx        Schema-driven auto mocks
    AutoMockedProviderMerged.tsx  Auto mocks + merged default resolvers
    mergeResolvers.tsx            Shallow merge of two resolver maps
    resolvers.tsx                 Project-wide default mock resolvers
    LoadingMockedProvider.tsx     Never-resolving link
    ErrorMockedProvider.tsx       Error-emitting link
    NoDataMockedProvider.tsx      Empty-data link
    LocalStateProvider.tsx        Cache seeded with faker data
    schema.json                   Introspection result for the API
stories/                      One story per mocking strategy, numbered 0 to 9
.storybook/                   Storybook 5 config with a TypeScript babel loader
```

## License

Public domain, under the [Unlicense](LICENSE.md).
