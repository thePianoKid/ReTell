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
      }. Include a title for the story at the beginning, ending with a | character. Ex: Story Title |`,
    },
  ];

  useEffect(() => {
    // fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.openAiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: reqBody,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setStory(data.choices[0].message.content);
    //     setLoading(false);
    //   });
    const data = `
    Example Title |

    Once upon a time, there was a little girl named Olivia. She was a curious and imaginative 7-year-old who loved reading books and going on magical adventures in her backyard.

One sunny afternoon, Olivia's parents told her some exciting news. "Olivia, guess what? We found a mysterious treasure map in the attic!" her father exclaimed, holding up an old, crinkled piece of parchment.

Olivia's eyes lit up with excitement. "Wow! Where does the map lead?" she asked, her voice filled with anticipation.

Her mother smiled and said, "According to the map, the treasure is hidden deep in the Enchanted Forest."

Olivia's heart raced with excitement. She pictured a forest full of beautiful flowers, towering trees, and magical creatures. "Can I go find the treasure, please?" she pleaded.

Her parents agreed, and after packing a backpack with some snacks and water, Olivia set off on her grand adventure. As she entered the Enchanted Forest, she couldn't help but notice colorful butterflies fluttering above her and the sweet smell of flowers filling the air.

As she ventured deeper into the forest, Olivia noticed an unusual sparkle coming from behind the bushes. Curiosity filled her, so she followed the sparkle until she stumbled upon a hidden clearing.

In the center of the clearing stood a magnificent unicorn with a shimmering silver coat and a mane as bright as the rainbow. Olivia's eyes widened in amazement.

The unicorn spoke in a gentle voice, "Hello, Olivia. I am Sparkle, the guardian of the Enchanted Forest. I knew you would come seeking the treasure."

Olivia was mesmerized and didn't know what to say. The unicorn explained that the treasure she sought was not gold or jewels but knowledge and wisdom.

"If you can solve my math puzzles, I will grant you the treasure," Sparkle said, a twinkle in her eyes.

Olivia loved math, so she eagerly accepted the challenge. Sparkle presented her with a series of addition and subtraction problems, starting with simple ones like 2 + 3 and 9 - 6. Olivia solved them quickly, her smile growing bigger after each correct answer.

With each correct answer, Sparkle's silver coat sparkled brighter, and the sounds of the Enchanted Forest became even more magical. Olivia's confidence soared as she solved harder equations like 7 - 4 + 2 and 5 + 3 - 1.

As Olivia solved the final puzzle, a beam of light illuminated the clearing, revealing a golden book. The unicorn explained that it held knowledge and stories from all around the world, allowing Olivia to learn and explore new places without leaving her home.

Olivia thanked Sparkle for the incredible gift and promised to cherish the book forever. As she waved goodbye to the majestic unicorn and made her way back home, Olivia couldn't wait to open the golden book and delve into its magical pages.

From then on, Olivia cherished the wisdom and knowledge she gained from the golden book. She shared her adventures with her friends and family, taking them on incredible journeys through the power of storytelling—knowing that the greatest treasure of all was not found in precious gems but in the joy of imagination, learning, and the love of unicorns.

And so, Olivia's magical adventure became a legend in the Enchanted Forest, inspiring future generations to believe in the power of their dreams and the beauty of knowledge.
    `;
    setTitle(data.split("|")[0].trim());
    setStory(data.split("|")[1].trim());
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="p-10">
        <div className="p-5 overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <div className="pl-5">
            <Skeleton className={`h-6 w-[250px]`} />
            <div className="pb-4"></div>
            <div className="space-y-2">
              {randLen.map((len, i) => (
                <Skeleton key={i} className={`h-4 w-[800px]`} />
              ))}
            </div>
            <div className="pb-4"></div>
            <div className="space-y-2">
              {randLen.map((len, i) => (
                <Skeleton key={i} className={`h-4 w-[800px]`} />
              ))}
            </div>
            <div className="pb-4"></div>
            <div className="space-y-2">
              {randLen.map((len, i) => (
                <Skeleton key={i} className={`h-4 w-[800px]`} />
              ))}
            </div>
          </div>
        </div>
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
