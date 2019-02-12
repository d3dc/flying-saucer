import { Route } from 'react-router'

import { pathJoin } from '../path'
import { useAppEffect } from '../store'
import { useProvided } from '../scope'
import { Redirect } from '../router'

export default function createRoutes(basePath, views) {
  return views.map(({ path, component, effect, redirect, ...rest }) => {
    const url = pathJoin(basePath, path)
    const render = renderHooks(
      effect && reduxHook(effect),
      redirect && redirectHook(redirect)
    )
    return (
      <Route
        key={url}
        path={url}
        render={render}
        component={component}
        {...rest}
      />
    )
  })
}

function renderHooks(...hooks) {
  const used = hooks.filter(Boolean)

  if (!used.length) {
    return undefined
  }

  return ~used.map(_.call())
}

function reduxHook(effect) {
  return () => {
    return null
  }
}

function redirectHook(payload) {
  let view, params
  if (typeof payload === 'object') {
    const { to, ...rest } = payload
    view = to
    params = rest
  } else {
    view = payload
  }
  return () => <Redirect key={view} view={view} params={params} />
}
