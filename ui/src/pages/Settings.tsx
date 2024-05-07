import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useCallback, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { TranslationSettingsFormType } from '@/models/TranslationSettingsFormType'
import { TranslationTool } from '@/models/enums/TranslationTool'

const Settings = () => {
  const [editMode, setEditMode] = useState(false)

  const form = useForm<TranslationSettingsFormType>({
    defaultValues: {
      APIKey: '',
      translationTool: TranslationTool.GOOGLE,
    },
  })
  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = form

  const onCancel = useCallback(() => {
    reset()
    setEditMode(false)
  }, [])

  return (
    <section className="bg-white mt-6 rounded-xl shadow-md p-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-base">Translation</h2>
          <p className="text-sm">Settings for translation</p>
        </div>
        <div className="gap-x-4 flex">
          {
            editMode ?
              (
                <>
                  <Button type="submit">Save</Button>
                  <Button variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              )
          }
        </div>
      </div>
      <Form {...form}>
        <form>
          <div className="flex justify-between mt-5">
            <FormField
              disabled={!editMode}
              control={form.control}
              name="translationTool"
              render={({ field }) => (
                <FormItem className="w-2/5 flex items-center gap-x-4">
                  <FormLabel className="shrink-0">Translation Tool</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!editMode}>
                      <SelectTrigger className="!mt-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          Object.values(TranslationTool).map(tool => (
                            <SelectItem value={tool}>
                              {tool}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch('translationTool') === TranslationTool.DEEPL && (
              <FormField
                disabled={!editMode}
                control={form.control}
                name="APIKey"
                render={({ field }) => (
                  <FormItem className="w-2/5 flex items-center gap-x-4">
                    <FormLabel className="shrink-0">API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="API Key" className="!mt-0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </form>
      </Form>
    </section>
  )
}

export default Settings
