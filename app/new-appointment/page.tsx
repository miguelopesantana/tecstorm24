"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import Dropzone from "@/components/dropzone";
import { toast } from "sonner"
import getReport from "@/lib/utils"
import OpenAI from "openai";


export default function NewAppointment() {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apfiles, setApFiles] = useState<File[]>([]);
    const [docfiles, setDocFiles] = useState<File[]>([]);

    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const handleSubmit = async () => {
        if (apfiles.length == 0) {
            toast.error("Error submitting files", {
                description: "There must be at least appointment script file."
            })
        } else setSubmitting(true);
    }

    function getType {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>)
    }

    useEffect(() => {

    }, []});

useEffect(() => {
    if (submitting) {
        console.log("Appointment Files", apfiles);
        console.log("Doctor Files", docfiles);
    }
    try {
        setLoading(true);
        const response = "Hey, report is ready!"
        // const result = getReport(openai);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
        console.log("Done");
    }

}, [submitting]);

return (
    <main className="flex-1 w-full h-full flex flex-col">
        {!submitting &&
            <Tabs defaultValue="appointment-notes" className="flex-1 flex flex-col w-full h-full">

                <div className="flex-1 w-full h-full px-12 py-12
                flex flex-col gap-8 
                 justify-start items-center">

                    <div className="w-full h-full
                     flex flex-row
                     justify-between items-center
                     ">
                        <h1>New Appointment</h1>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button >
                                    Save Appointment
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleSubmit()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>

                        </AlertDialog>
                    </div>
                    <div className="w-full h-full
                    flex flex-col justify-center items-center gap-6">

                        <TabsList className="grid w-fit h-fit grid-cols-2 text-xl">
                            <TabsTrigger value="appointment-notes" className="text-base">Appointment's Notes</TabsTrigger>
                            <TabsTrigger value="doctor-notes" className="text-base">Doctor's Notes</TabsTrigger>
                        </TabsList>
                        <TabsContent className="w-full h-full" value="appointment-notes">
                            <Dropzone files={apfiles} setFiles={setApFiles} />
                        </TabsContent>
                        <TabsContent className="w-full  h-full" value="doctor-notes">
                            <Dropzone files={docfiles} setFiles={setDocFiles} />
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        }

    </main >
);
}