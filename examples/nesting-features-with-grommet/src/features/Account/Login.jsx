import { _$, useHooks, useState, useCallback, useNavigator } from '@@'
import { Box, Heading, FormField, TextInput, Button } from 'grommet'

const enhance = _$(dispatch => ({
  login: dispatch.account.login,
}))

function Login({ login }) {
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  const [loading, updateLoading] = useState(false)

  const nav = useNavigator()

  const submit = useCallback(
    async () => {
      await updateLoading(true)
      await signup({ username, password })
      return nav.start()
    },
    [state, nav]
  )

  return (
    <Box width="50%">
      <Heading>Login</Heading>
      <FormField label="Username">
        <TextInput
          key="username"
          type="text"
          disabled={loading}
          value={username}
          onChange={event => updateUsername(event.target.value)}
        />
      </FormField>
      <FormField label="Password">
        <TextInput
          key="password"
          type="password"
          disabled={loading}
          value={password}
          onChange={event => updatePassword(event.target.value)}
        />
      </FormField>
      <Button label="Login" disabled={loading} onClick={submit} />
    </Box>
  )
}

export default Login |> useHooks |> enhance
