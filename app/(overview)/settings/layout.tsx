import { getCurrentUser } from '@/app/lib/actions'
import SettingsNav from '@/app/ui/settings/SettingsNav'

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  return (
    <>
      <SettingsNav user={user} />
      {children}
    </>
  )
}

export default SettingsLayout
