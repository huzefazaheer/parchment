import { TextInputField } from '../../../../../components/ui/inputfield/textinputfield'
import styles from '../signup.module.css'

export default function Form2({ formData, setFormData }) {
  return (
    <>
      <TextInputField
        label="username"
        placeholder="Enter your username"
        icon1={'/username.svg'}
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value })
        }}
      />
      <div className={styles.inputfield}>
        <TextInputField
          label="displayname"
          placeholder="Enter your display name"
          icon1={'/displayname.svg'}
          value={formData.displayName}
          onChange={(e) => {
            setFormData({ ...formData, displayName: e.target.value })
          }}
        />
      </div>
    </>
  )
}
