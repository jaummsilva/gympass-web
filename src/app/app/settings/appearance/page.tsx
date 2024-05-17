import { Separator } from '@/components/ui/separator'

import { AppearanceForm } from './appearance-form'

export default function Appearance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground">
          Customize a aparência do aplicativo. Alterne automaticamente entre os
          temas claro e escuro.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
