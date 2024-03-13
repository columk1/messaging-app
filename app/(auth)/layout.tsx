const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {children}
    </main>
  )
}

export default AuthLayout
