"use client"

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useCreateBrain, useGetBrains, useDeleteBrain } from "@/hooks/queries/useBrains"

interface IFormInputs {
  name: string
}

export default function BrainsPage() {
  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      name: "test",
    },
  })

  const { mutate: createBrain, error } = useCreateBrain()
  const { data: brains, isLoading } = useGetBrains()
  const { mutate: deleteBrain } = useDeleteBrain()

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    createBrain(data.name)
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} />}
        />
        <button type="submit" name="createBrain" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
        {error && <p>{error.message}</p>}
      </form>
      {isLoading && <p>Loading brains...</p>}
      {brains && (
        <div className="flex flex-col gap-2">
          {brains.map((brain) => (
            <div key={brain.id} className="flex items-center justify-between p-2 border rounded">
              <span>{brain.name}</span>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this brain?')) {
                    deleteBrain(brain.id)
                  }
                }}
                disabled={isLoading}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-red-300"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}