/* eslint-disable tailwindcss/no-custom-classname */
import type { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from './components/user-auth-form'

export const metadata: Metadata = {
  title: 'Login',
}

export default function SignIn() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 " />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 size-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Singular BI
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Se te oferecerem um lugar em um foguete, não pergunte qual
              é o teu assento! Simplesmente embarque.&rdquo;
            </p>
            <footer className="text-sm">Sheryl Sandberg</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar na sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e senha para acessar sua conta.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de serviço
            </Link>{' '}
            e{' '}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
