import AuthForm from '@/app/ui/AuthForm'
import Logo from '@/app/ui/svg/Logo'

export default function Home() {
  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Logo className='h-12 w-12 mx-auto stroke-violet-400' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-200'>
          Sign in to your account
        </h2>
      </div>
      <AuthForm formType='LOGIN' />
    </>
  )
}
