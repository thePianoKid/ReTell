"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Story() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const themes = searchParams.get("themes");
  const eduPrompt = searchParams.has("eduPrompt")
    ? searchParams.get("eduPrompt")
    : null;

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setLoading] = useState(true);
  const randLen = new Array(8);

  for (let i = 0; i < 8; i++) {
    randLen[i] = Math.floor(Math.random() * (800 - 600 + 1)) + 600;
  }

  const reqBody = [
    {
      role: "system",
      content:
        "You are the writer of children's books, skilled in telling short stories that would appeal to children.",
    },
    {
      role: "user",
      content: `Write a story where the main character is named ${name}, who is ${age} years old. ${name}'s parent also asked to include the following themes in the story: ${themes}. ${
        eduPrompt ? eduPrompt : ""
      }.`,
    },
  ];

  useEffect(() => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.openAiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: reqBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(`A Story Just for ${name}`);
        setStory(data.choices[0].message.content);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="p-10">
        <Skeleton className={`h-6 w-[250px]`} />
        <div className="pb-3"></div>
        <div className="p-5 overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <div className="pl-5">
            <div className="pb-4"></div>
            <div className="space-y-2">
              <Skeleton className={`h-4 w-[750px]`} />
              <Skeleton className={`h-4 w-[850px]`} />
              <Skeleton className={`h-4 w-[800px]`} />
              <Skeleton className={`h-4 w-[700px]`} />
            </div>
            <div className="pb-4"></div>
            <div className="space-y-2">
              <Skeleton className={`h-4 w-[700px]`} />
              <Skeleton className={`h-4 w-[800px]`} />
              <Skeleton className={`h-4 w-[650px]`} />
              <Skeleton className={`h-4 w-[700px]`} />
            </div>
            <div className="pb-4"></div>
            <div className="space-y-2">
              <Skeleton className={`h-4 w-[850px]`} />
              <Skeleton className={`h-4 w-[800px]`} />
              <Skeleton className={`h-4 w-[800px]`} />
              <Skeleton className={`h-4 w-[700px]`} />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pt-2">Loading: takes about ≈2 minutes to generate a story 🕰️</p>
      </div>
    );
  }

  if (!story) {
    return (
      <h2 className="text-3xl font-bold tracking-tight pl-5">
        Could not get data from the OpenAI API 😞
      </h2>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold tracking-tight pb-3">{title}</h2>
      <div className="p-5 overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <p style={{ whiteSpace: "pre-wrap" }}>{story}</p>
      </div>
    </div>
  );
}
