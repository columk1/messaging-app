import Logo from '@/app/ui/svg/Logo'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        {/* <div className='p-1 bg-violet-100 w-min mx-auto rounded-xl'> */}
        <Logo className='h-12 w-12 mx-auto stroke-violet-400' />
        {/* </div> */}
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-200'>
          Sign in to your account
        </h2>
      </div>
      {children}
    </main>
  )
}

export default AuthLayout
