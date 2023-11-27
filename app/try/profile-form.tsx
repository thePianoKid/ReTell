"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const PROMPT_MAP = {
  "Reading Skills": {
    "Pre-Kindergarten":
      "The story is to a pre-kindergarten students; in the story, the characters learn about the alphabet.",
    Kindergarten:
      "Make the story fun for a child in kindergarten. In one part of the story, the main character should learn how to spell their name.",
    "Grade 1":
      "Integrate a basic phonics lesson into the story; the story should go over some common sight words.",
  },
  Math: {
    "Pre-Kindergarten":
      "Weave counting into the story; make it fun and accessible to the young reader.",
    Kindergarten:
      "Include basic addition and subtraction at the kindergarten level in the story.",
    "Grade 1":
      "Some grade 1 level math should be included in the story; the characters should need to apply their knowledge of math to solve a problem.",
  },
  History: {
    "Pre-Kindergarten":
      "In the story, the characters should learn about the Canadian flag and what is represents.",
    Kindergarten:
      "Include Marco Polo as one of the characters; have the other characters go on daring adventures with Marco.",
    "Grade 1":
      "In the course of the story, the characters should meet Leonardo da Vinci. They learn about Leonardo's inventions and go on an adventure with him.",
  },
};

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
  eduPrompt: z.optional(z.string()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function ProfileForm() {
  const router = useRouter();

  // TODO: Sync this with the default values
  const [eduContentToggle, setEduContentToggle] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    let queryString = `/story?name=${data.name}&age=${data.age}&themes=${data.storyThemes}`;
    if (data.eduPrompt) {
      queryString = queryString + `&eduPrompt=${data.eduPrompt}`;
    }

    router.push(queryString);
  }

  function ageToGrade(age: number) {
    if (age <= 3) return "Pre-Kindergarten";
    if (age <= 6) return "Kindergarten";
    if (age <= 7) return "Grade 1";
    return "";
  }

  function toggleEduCards() {
    setEduContentToggle(!eduContentToggle);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pl-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pt-8 mr-80">
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
              <FormItem className="mr-80">
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
              <FormItem className="mr-80">
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
          <FormField
            render={() => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mr-80">
                <div className="space-y-0.5">
                  <FormLabel>Include Educational Content</FormLabel>
                  <FormDescription>
                    Include lessons from phonics, math or history in the story.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={eduContentToggle}
                    onCheckedChange={toggleEduCards}
                  />
                </FormControl>
              </FormItem>
            )}
            name={""}
          />
          {eduContentToggle ? (
            <FormField
              control={form.control}
              name="eduPrompt"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Educational Content</FormLabel>
                  <FormDescription>
                    We know from He-Man that every good story needs to impart
                    wisdom, you get to decide what it is!
                  </FormDescription>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-2xl grid-cols-3 pt-5 space-x-3"
                  >
                    {Object.keys(PROMPT_MAP).map((topic: string) => (
                      <FormItem key={topic}>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer">
                          <FormControl>
                            <RadioGroupItem
                              value={
                                PROMPT_MAP[topic as keyof typeof z.string][
                                  ageToGrade(Number(form.getValues().age))
                                ]
                              }
                              className="sr-only"
                            />
                          </FormControl>
                          <Card>
                            <CardHeader>
                              <CardTitle>{topic}</CardTitle>
                              <CardDescription>
                                {ageToGrade(Number(form.getValues().age))}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button variant="secondary" type="button">
                                    View Prompt
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="flex justify-between space-x-4 p-5 overflow-hidden rounded-[0.5rem] border bg-background shadow">
                                    <div className="space-y-1">
                                      <h4 className="text-sm font-semibold">
                                        AI Prompt
                                      </h4>
                                      <p className="text-sm">
                                        {
                                          PROMPT_MAP[topic as keyof typeof z.string][
                                            ageToGrade(
                                              Number(form.getValues().age)
                                            )
                                          ]
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            </CardContent>
                          </Card>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            ></FormField>
          ) : (
            <></>
          )}
          <Button type="submit">Create a story!</Button>
          <div className="pb-1"></div>
        </form>
      </Form>
    </div>
  );
}
