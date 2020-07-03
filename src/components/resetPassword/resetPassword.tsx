import { useState } from 'react'
import Link from 'next/link'
import { Auth } from '@aws-amplify/auth'
import Router from 'next/router'
import styles from '../../pages/authPage.module.scss'
import serialize from 'form-serialize'
import Logo from '../../img/logo.svg'

interface ResetPasswordProps {
  email: string
}

interface ValidationProps {
  email?: string
  code?: string
  password?: string
}

export function ResetPassword({ email }: ResetPasswordProps) {
  const [isRequestPending, setRequestPending] = useState(false)
  const [error, setError] = useState('')
  const [invalids, setInvalids] = useState<ValidationProps>({})

  function validate({ code, password }: ValidationProps) {
    const temp: ValidationProps = {}

    if (!code) temp.code = 'error'
    if (!password) temp.password = 'error'
    return temp
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setRequestPending(true)
    setError('')
    setInvalids({})

    const formData = serialize(e.target, { hash: true })
    const { code, password } = formData
    const validation = validate(formData)

    if (Object.keys(validation).length) {
      setRequestPending(false)
      setInvalids(validation)
      return
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, password)
      Router.push('/signIn')
    } catch (err) {
      setError(err.message)
      setRequestPending(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Reset your password</h1>
      <form onSubmit={handleSubmit} className={styles.body}>
        <input
          readOnly
          value={email}
          name="email"
          className={`${invalids.email ? styles[invalids.email] : ""} input-1`}
          type="email"
          placeholder="Email" />
        <input name="code" className={`${invalids.code ? styles[invalids.code] : ""} input-1`} type="text" placeholder="Code" />
        <input
          name="password"
          className={`${invalids.password ? styles[invalids.password] : ""} input-1`}
          type="password"
          placeholder="New Password"
          autoComplete="new-password" />
        <button disabled={isRequestPending} type="submit" className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}>
          Reset Password
        </button>
        <div>
          <Link href="/signIn"><a href="/signIn">Back to Sign In</a></Link>
        </div>
      </form>
    </div>
  )
}
