"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(60, {
      message: "Name must not be longer than 60 characters.",
    }),
  age: z.string(),
  storyThemes: z.string(),
  moral: z.enum(["moral1", "moral2", "moral3", "moral4"], {
    required_error: "Please select a moral.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Generating story...");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="pl-5 pt-8 mr-80">
              <FormLabel>Child&apos;s Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Olivia, Flor, Cole..." {...field} />
              </FormControl>
              <FormDescription>
                This will be the name of the main character of the story 📖
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="pl-5 mr-80">
              <FormLabel>Child&apos;s Age</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 4" {...field} />
              </FormControl>
              <FormDescription>
                You can never be too old for bedtime stories 😉
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: when the user presses the add button, or presses enter, a badge appears with the theme */}
        <FormField
          control={form.control}
          name="storyThemes"
          render={({ field }) => (
            <FormItem className="pl-5 mr-80">
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Unicorns, Dragons, Anglerfish"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What does your child like? What do you want to include in the
                story? 🦄
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pl-5">
          <FormField
            control={form.control}
            name="moral"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Choose a Moral</FormLabel>
                <FormDescription>
                  We know from He-Man that every good story needs a moral, you
                  get to decide what it is!
                </FormDescription>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid max-w-md grid-cols-2 gap-8 pt-5"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="moral1" className="sr-only"/>
                      </FormControl>
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                          <p>Card Footer</p>
                        </CardFooter>
                      </Card>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="moral2" className="sr-only" />
                      </FormControl>
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                          <p>Card Footer</p>
                        </CardFooter>
                      </Card>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="pl-5 pb-5">
          <Button type="submit">Create a story!</Button>
        </div>
      </form>
    </Form>
  );
}
