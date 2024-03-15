'use client'

import { useCallback, useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Input from './Input'
// import { authenticate } from '@/app/lib/actions'
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import Button from '@/app/ui/Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type FormType = 'LOGIN' | 'REGISTER'

const AuthForm = ({ formType = 'LOGIN' }: { formType?: FormType }) => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleFormType = useCallback(() => {
    if (formType === 'LOGIN') {
      router.push('/register')
    } else {
      router.push('/login')
    }
  }, [formType])

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    try {
      if (formType === 'REGISTER') {
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const data = await res.json()
          toast.error(data.message || 'Failed to submit the data. Please try again.')
        } else {
          signIn('credentials', formData)
        }
      } else {
        // LOGIN FORM
        const res = await signIn('credentials', {
          ...formData,
          redirect: false,
        })
        if (!res?.ok) {
          toast.error(res?.error || 'Incorrect username or password')
        } else {
          toast.success('Login successful')
          router.push('/users')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const socialAction = (action: string) => {
    setLoading(true)
    signIn(action, { redirect: false }).finally(() => setLoading(false))
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm: max-w-md'>
      <div className='bg-purple-3 px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        {formType === 'REGISTER' ? (
          <form onSubmit={submitHandler} className='space-y-6'>
            <Input
              type='text'
              id='name'
              name='name'
              label='Name'
              placeholder=''
              required={true}
              errors={[]}
            />
            <Input
              type='email'
              id='email'
              name='email'
              label='Email'
              placeholder=''
              required={true}
              errors={[]}
              errorMsg={'Please enter a valid email address'}
            />
            <Input
              type='text'
              id='username'
              name='username'
              label='Username'
              placeholder=''
              required={true}
              max={30}
              errors={[]}
              errorMsg={'Username must be between 1 and 30 characters long'}
            />
            <Input
              type='password'
              id='password'
              name='password'
              label='Password'
              placeholder=''
              required={true}
              min={6}
              errors={[]}
              errorMsg={'Password must be at least 6 characters long'}
            />
            <SubmitButton title={'Sign Up'} />
          </form>
        ) : (
          // LOGIN FORM
          <form onSubmit={submitHandler} className='space-y-6'>
            <Input
              type='text'
              id='email'
              name='email'
              label='Email'
              placeholder=''
              required={true}
              errors={[]}
            />
            <Input
              type='password'
              id='password'
              name='password'
              label='Password'
              placeholder=''
              required={true}
              errors={[]}
            />
            <SubmitButton title={'Login'} />
          </form>
        )}
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute flex items-center inset-0'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-purple-3 px-2 text-gray-200'>Or continue with</span>
            </div>
          </div>
          <div className='flex gap-2 mt-6'>
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-300'>
          <div>{formType === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
          <button onClick={toggleFormType} className='underline cursor-pointer'>
            {formType === 'LOGIN' ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus()
  // Add group class to form to disable button using CSS when form is invalid
  return (
    <Button
      className='mt-4 w-full flex justify-center group-invalid:pointer-events-none group-invalid:opacity-50'
      aria-disabled={pending}
    >
      {title}
      {/* <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' /> */}
    </Button>
  )
}

export default AuthForm
