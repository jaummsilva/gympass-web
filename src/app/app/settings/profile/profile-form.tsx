import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/lib/query-client'

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: 'Por favor, insira seu nome de usuário.',
    })
    .min(2, {
      message: 'O nome de usuário deve ter pelo menos 2 caracteres.',
    }),
  email: z
    .string({
      required_error: 'Por favor, insira seu email.',
    })
    .email({ message: 'Por favor, insira um email válido.' }),
  password: z.string({
    required_error: 'Por favor, insira sua senha.',
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  user: {
    email: string
    name: string
  }
}
export function ProfileForm({ user }: ProfileFormProps) {
  const [inputType, setInputType] = useState<'password' | 'text'>('password')

  function handleToggleInputType() {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
    },
  })

  async function onSubmit({ email, password, name }: ProfileFormValues) {
    try {
      const result = await updateProfile({ email, password, name })

      if (result.status === 204) {
        toast.success('Perfil atualizado com sucesso.', {
          position: 'bottom-right',
        })

        await queryClient.invalidateQueries({ queryKey: ['get-profile'] })
      }
    } catch (error) {
      toast.error('Erro ao atualizar perfil.', {
        position: 'bottom-right',
      })
    }
  }

  const {
    mutateAsync: handleUpdateProfileFn,
    isPending: isHandleUpdateProfileFnPeding,
  } = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: form.handleSubmit(onSubmit),
  })

  return (
    <Form {...form}>
      <form onSubmit={handleUpdateProfileFn} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isHandleUpdateProfileFnPeding}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="user.name" {...field} />
              </FormControl>
              <FormDescription>
                Esse é o seu usuário único que será utilizado para acessar o
                sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isHandleUpdateProfileFnPeding}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Esse é o seu email único que também será utilizado para acessar
                o sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isHandleUpdateProfileFnPeding}
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
              <FormDescription>
                Esse é a sua senha única que será utilizada para acessar o
                sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isHandleUpdateProfileFnPeding}>
          {isHandleUpdateProfileFnPeding ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Check className="mr-2 size-4" />
          )}
          Atualizar perfil
        </Button>
      </form>
    </Form>
  )
}
