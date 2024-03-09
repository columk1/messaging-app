import { getCurrentUser } from '@/app/lib/actions'
import SettingsForm from '@/app/ui/settings/SettingsForm'

const Settings = async () => {
  const currentUser = await getCurrentUser()
  return (
    <>
      <div className='hidden lg:block flex-1 h-full'>
        <SettingsForm user={currentUser} />
      </div>
    </>
  )
}

export default Settings
