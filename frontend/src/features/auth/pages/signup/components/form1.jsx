import { DateInputField } from '../../../../../components/ui/inputfield/dateinputfield'
import { EmailInputField } from '../../../../../components/ui/inputfield/emailinputfield'
import { PasswordInputField } from '../../../../../components/ui/inputfield/passwordinputfield'

import styles from '../signup.module.css'

export default function Form1({ formData, setFormData }) {
  return (
    <>
      <EmailInputField
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value })
        }}
      />
      <div className={styles.inputfield}>
        <PasswordInputField
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value })
          }}
        />
      </div>
      <div className={styles.inputfield}>
        <DateInputField
          label="date"
          placeholder="Enter your birth date"
          icon1={'/date.svg'}
          icon2={'/datepicker.svg'}
          value={formData.date}
          setValue={(date) => {
            setFormData({ ...formData, date: date })
          }}
          onChange={(e) => {
            setFormData({ ...formData, date: e.target.value })
          }}
        />
      </div>
    </>
  )
}
