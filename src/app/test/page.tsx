"use client"

import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface IFormInputs {
  TextField: string
  MyCheckbox: string
}

export default function TestPage() {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      MyCheckbox: "test",
    },
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <input {...field} />}
      />
      <input type="submit" />
    </form>
  )
}