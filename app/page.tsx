import Image from 'next/image'
import Logo from '@/app/ui/svg/Logo'
import AuthForm from '@/app/ui/AuthForm'

export default function Home() {
  return (
    <main className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Logo className='h-12 w-12 mx-auto stroke-emerald-500' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </main>
  )
}
