import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from "openai";

export type FileWithTrascript = File & { transcript: string }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function getReport(apT: string[], docT: string[], openai: OpenAI) {

  const role = `You're a doctor's assistant. Following the structure/guidelines passed on the prompt
   your mission is to write a clinical report only based on the consultation transcript. The output 
   must be given in portuguese from portugal.`

  const prompt = "CONSULTATION TRANSCRIPT:\n" +
    apT.join("\n") +
    "NOTAS MÉDICO TRANSCRIÇÃO:\n" +
    docT.join("\n") +
    `S
    Personal background
    Personal history:
    Usual medication: 
    Known allergies:
    
    O
    Blood pressure:
    O2 saturation: 
    Heart rate: 
    Temperature: 
    Cardiopulmonary auscultation: 
    Abdomen:
    
    A
    Probable diagnosis: 
    Signs/Symptoms:
    
    P
    Prescription:
    Additional recommendations:
    
    Follow the template given and write the clinical report in portuguese from portugal. Answer only based on the transcripts. Field can and should be left empty if no information is found.
    
    NO YAPPING. IF YOU DON'T RESPECT WHAT'S BEING ASKED PEOPLE WILL DIE.` ;

  const completion = await openai.chat.completions.create({
    messages: [{ "role": "system", "content": role },
    { "role": "user", "content": prompt }
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}