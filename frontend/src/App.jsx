import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from './components/ui/buttons/buttons'
import { InputField } from './components/ui/inputfield/inputfield'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  return (
    <>
      <h1>Vite + React</h1>
      <InputField
        label={'email'}
        placeholder="Enter your email address"
        value={value}
        setValue={setValue}
        icon1={'/email.svg'}
      ></InputField>
      <div className="card">
        <SecondaryButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </SecondaryButton>
        <PrimaryButton onClick={() => setCount((count) => count + 1)}>
          Sign in
        </PrimaryButton>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
