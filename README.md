# react-flying-saucer 🛸

> The 👾 aren't in the bikeshed.

A zero-config way to write functional react apps that scale.

**features:**

- 🔋 All the batteries are included
- 🔗 Compose feature modules as declarative React components
- 📍[Routing](https://github.com/ReactTraining/react-router) and other common components are provided and overloaded through the context API
- 🕳 opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel)
- 📬 dispatch changes through redux to encapsulated [rematch models](https://rematch.gitbooks.io/rematch/docs/api.html#models)
- 📝 memoize updating from your redux state using [rematch selectors](https://rematch.gitbooks.io/rematch/plugins/select/)

## Quick Start

- `$npx create-react-flying-saucer app`
- `$cd app`
- `$yarn start`

### Import Aliases

`@` - A link to the source root of your project.

`@@` - `react-flying-saucer` [re-exports](#exported-utilities) everything you need for creating and mounting a feature fleet.

> One flying saucer, Two flying saucers

```js
import { $$ } from '@@'
import Sidebar from '@/features/sidebar'
```

### dot files

`react-flying-saucer` respects any `.babelrc` and `.eslintrc` configuration files. Any additional configuration your project needs can be added directly to these files.

### exported utilities

- [`Mothership` to assemble your feature fleet](docs/api.md#mothership-)
- [`createApp` to declare data sources for the Mothership](docs/api.md#createappconfig)
- [`createFeature` to declare views, models, and ambient dependencies for a feature](docs/api.md#createfeatureconfig)
- [`createModel` to create encapsulated redux logic for a feature](docs/api.md#createModel)
- [`redux` bindings](docs/api.md#redux-bindings)
- [`context` bindings](docs/api.md#context-bindings)

## Examples

- [TodoMVC](examples/todos)

## More Reading

- [API](docs/api.md)
- [WIP][getting started](docs/gettting-started.md)

## Packages

- [create-react-flying-saucer](packages/create-react-flying-saucer)
  - Create a create-react-app app and then codemod it to outerspace!
- [react-flying-saucer](packages/react-flying-saucer)
  - npm scripts and runtime dependencies for a functional react that's out of this world!

## Typescript when?!

As soon as @rematch/rematch fixes its core typings.
