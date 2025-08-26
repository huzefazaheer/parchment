import styles from './editprofile.module.css'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { useContext, useRef, useState } from 'react'
import { TextInputField } from '../../../../components/ui/inputfield/textinputfield'
import { appContext } from '../../../../App'
import useData from '../../../../utils/useData'
import uploadPhoto from './uploadphoto'

export default function EditProfileModal({ show, toggleShow }) {
  const { user, updateJwt } = useContext(appContext)
  const photouploadRef = useRef(null)
  const backdropuploadRef = useRef(null)
  const [data, setData] = useState({
    displayName: user.displayName,
    photo: user.photo,
    backdrop: user.backdrop,
  })
  const editProfileData = useData('/user/', 'put', data)
  const [pics, setPics] = useState({
    photo: user.photo,
    backdrop: user.backdrop,
  })

  function exitModal() {
    toggleShow(false)
  }

  async function updateProfile() {
    let updatedData = data
    const newphoto = photouploadRef.current.files[0]
    const newbackdrop = backdropuploadRef.current.files[0]
    if (newbackdrop != undefined) {
      const photo = await uploadPhoto('backdrop', newbackdrop)
      updatedData = {
        ...updatedData,
        backdrop: photo,
      }
    }
    if (newphoto != undefined) {
      const photo = await uploadPhoto('profilephotos', newphoto)
      updatedData = { ...updatedData, photo: photo }
    }
    console.log(updatedData)
    setData(updatedData)
    console.log(await editProfileData.fetchData(undefined, updatedData))
    await updateJwt()
    exitModal()
  }

  function onPhotoChange() {
    const newphoto = photouploadRef.current.files[0]
    if (newphoto) {
      const previewUrl = URL.createObjectURL(newphoto)
      setPics({ ...pics, photo: previewUrl })
    }
  }

  function onBackdropChange() {
    const newbackdrop = backdropuploadRef.current.files[0]
    if (newbackdrop) {
      const previewUrl = URL.createObjectURL(newbackdrop)
      setPics({ ...pics, backdrop: previewUrl })
    }
  }

  return (
    <div
      className={`${styles.modalcontainer} ${show ? '' : styles.modalhidden}`}
    >
      <div className={styles.modal}>
        <div className={styles.top}>
          <img src={pics.photo} alt="" />
          <img src={pics.backdrop} alt="" />
          <img
            className={styles.profileedit}
            src="/edit.svg"
            alt=""
            onClick={() => backdropuploadRef.current.click()}
          />
          <img
            className={styles.photoedit}
            src="/edit.svg"
            alt=""
            onClick={() => photouploadRef.current.click()}
          />
          <input
            accept="image/*"
            ref={photouploadRef}
            type="file"
            style={{ display: 'none' }}
            onChange={onPhotoChange}
          />
          <input
            accept="image/*"
            ref={backdropuploadRef}
            type="file"
            style={{ display: 'none' }}
            onChange={onBackdropChange}
          />
        </div>
        <ul>
          <li>
            <TextInputField label={'Username'} value={user.username} />
          </li>
          <li>
            <TextInputField
              label={'Display Name'}
              value={data.displayName}
              onChange={(e) =>
                setData({ ...data, displayName: e.target.value })
              }
            />
          </li>
        </ul>
        <div className={styles.control}>
          <SecondaryButton width="100px" height="40px" onClick={exitModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton width="100px" height="40px" onClick={updateProfile}>
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
