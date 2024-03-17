import { getCurrentUser } from '@/app/lib/actions'
import ProfileForm from '@/app/ui/settings/ProfileForm'
import SettingsHeader from '@/app/ui/settings/SettingsHeader'

const Profile = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div className='h-full flex flex-1 flex-col'>
      <SettingsHeader title='Profile' subtitle='Edit your public information' />
      <div className='flex-1 h-full'>
        <ProfileForm user={currentUser} />
      </div>
    </div>
  )
}

export default Profile
