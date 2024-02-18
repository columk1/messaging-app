'use client'

import { useCallback, useState, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Input from './Input'
// import { authenticate } from '@/app/lib/actions'
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Button } from './button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type FormType = 'LOGIN' | 'SIGNUP'

const AuthForm = () => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [formType, setFormType] = useState('LOGIN')
  // const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const toggleFormType = useCallback(() => {
    if (formType === 'LOGIN') {
      setFormType('SIGNUP')
    } else {
      setFormType('LOGIN')
    }
  }, [formType])

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))

    if (formType === 'SIGNUP') {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          throw new Error('Failed to submit the data. Please try again.')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      // LOGIN route
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          throw new Error('Failed to submit the data. Please try again.')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm: max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form onSubmit={submitHandler} className='space-y-6'>
          {formType === 'SIGNUP' && (
            <>
              <Input
                type='text'
                id='firstName'
                name='firstName'
                label='First Name'
                required={true}
                errors={[]}
              />
              <Input
                type='text'
                id='lastName'
                name='lastName'
                label='Last Name'
                required={true}
                errors={[]}
              />
            </>
          )}
          <Input type='text' id='email' name='email' label='Email' required={true} errors={[]} />
          <Input
            type='password'
            id='password'
            name='password'
            label='Password'
            required={true}
            errors={[]}
          />
          <SubmitButton title={formType === 'LOGIN' ? 'Login' : 'Sign Up'} />
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute flex items-center inset-0'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>Or continue with</span>
            </div>
          </div>
          <div className='flex gap-2 mt-6'>
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{formType === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
          <div onClick={toggleFormType} className='underline cursor-pointer'>
            {formType === 'LOGIN' ? 'Sign Up' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus()
  return (
    <Button className='mt-4 w-full flex justify-center' aria-disabled={pending}>
      {title}
      {/* <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' /> */}
    </Button>
  )
}

export default AuthForm
