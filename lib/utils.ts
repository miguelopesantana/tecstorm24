import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from "openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function getReport(openai: OpenAI) {
  const completion = await openai.chat.completions.create({
    messages: [{ "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Who won the world series in 2020?" }
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}