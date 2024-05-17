'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate } from '@/api/authenticate'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const userAuthFormSchema = z.object({
  email: z.string({ message: 'Email é obrigatório' }).email({
    message: 'Email deve ser um email válido',
  }),
  password: z.string({ message: 'Senha é obrigatória' }),
})

type UserAuthFormSchema = z.infer<typeof userAuthFormSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [inputType, setInputType] = React.useState<'password' | 'text'>(
    'password',
  )

  function handleToggleInputType() {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const router = useRouter()

  const form = useForm<UserAuthFormSchema>({
    resolver: zodResolver(userAuthFormSchema),
  })
  async function onSubmit({ email, password }: UserAuthFormSchema) {
    try {
      const response = await authenticate({ email, password })

      const { token } = response.data

      nookies.set(undefined, 'token', token, {
        maxAge: 60 * 60,
        path: '/',
      })

      toast.success('Login realizado com sucesso!', {
        position: 'bottom-right',
      })

      return router.push('/dashboard')
    } catch (error) {
      return toast.error('Credenciais inválidas!', {
        position: 'bottom-right',
      })
    }
  }
  const { mutateAsync: handleSubmitFn, isPending: isHandleSubmitFnPending } =
    useMutation({
      mutationFn: form.handleSubmit(onSubmit),
    })

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmitFn} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            disabled={isHandleSubmitFnPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            disabled={isHandleSubmitFnPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="flex rounded-md border focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <Input
                      placeholder="#senha#"
                      type={inputType}
                      className="border-none focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0"
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleToggleInputType}
                      className="hover:bg-transparent"
                    >
                      {inputType === 'password' ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isHandleSubmitFnPending}
          >
            {isHandleSubmitFnPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Entrar na sua conta
          </Button>
        </form>
      </Form>
    </div>
  )
}
