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
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import getReport from "@/lib/utils"
import OpenAI from "openai";
import Dropzone from "@/components/dropzone";
import { FileWithTrascript } from "@/lib/utils";
import { time } from "console";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"
import { DownloadIcon } from "@radix-ui/react-icons";

import showdown from 'showdown'

export default function NewAppointment() {
    const [is1Open, setIs1Open] = useState(false);
    const [aptype, setApType] = useState<string>("");
    const [is2Open, setIs2Open] = useState(false);
    const [patientID, setPatientID] = useState<string>("");
    const [is3Open, setIs3Open] = useState(false);

    const [apfiles, setApFiles] = useState<FileWithTrascript[]>([]);
    const [docfiles, setDocFiles] = useState<FileWithTrascript[]>([]);

    const [submitting, setSubmitting] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [report, setReport] = useState<string>("");

    // console.log("OpenAI-KEY", process.env.NEXT_PUBLIC_OPENAI_API_KEY );
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });


    // get the first dialog open, on load
    useEffect(() => {
        setIs1Open(true);
    }, []);


    function handleSave() {
        console.log(aptype);
        nextDialog()
    }

    function nextDialog() {
        if (is1Open) {
            setIs1Open(false);
            setIs2Open(true);
        }
    }

    function handleSaveID(dialog: number) {
        if (!patientID.trim()) {  // Check if the patientId is empty or only whitespace
            toast.error('Patient ID is required.', {
                description: 'Please enter a valid patient ID.'
            });  // Set an error message
            return;  // Prevent the dialog from closing
        }
        console.log('Patient ID:', patientID);
        if (dialog == 2) {
            setIs2Open(false);
        } else if (dialog == 3) {
            setIs3Open(false);
            setSubmitting(true);
        }
        setIs2Open(false);  // Close the dialog if validation passes
    }

    function handleCancel() {
        setPatientID("");  // Clear the patient ID
        setIs2Open(false);
    }

    const handleSubmit = async () => {
        if (apfiles.length == 0) {
            toast.error("Error submitting files", {
                description: "There must be at least appointment script file."
            })
        } else {
            if (patientID.trim() == "") {
                await setIs3Open(true);
            } else {
                setSubmitting(true);
            }
        }
    }

    useEffect(() => {

        const get = async () => {
            // const response = "This is the report";
            // await new Promise(resolve => setTimeout(resolve, 5000));
            let apT: string[] = [];
            let docT: string[] = [];

            const string1 = `Então, boa tarde, Sr. João. Boa tarde. Tudo bem? Tudo ótimo. Então, o que é que o traz cá hoje? Olha, Sr. Doutor, eu já há umas semanas que ando com uma espécie de heredouro no peito que nem me deixa dormir de noite. Eu marquei esta consulta para vermos isto. Ok, mas diga-me uma coisa, esse heredouro é mais vindo às alturas do dia? É depois das refeições e maioritariamente à noite. Ok, pronto. Mas diga-me uma coisa, ele é constante ou é só mesmo nessas alturas? Não, não é constante, é mais nestas alturas, sim. Pronto, exato, é mais associado a isso. Pronto, e sabemos se esse serredor tem aumentado de intensidade nos últimos tempos? Ou se já teve alguma vez este tipo de sintomas? Não, costuma ser sempre o mesmo tipo de dor e nunca o tive. Ok. E assim, tem outros sintomas associados como febre, dor no peito, que pode passar pelo pescoço e para os braços, falta de ar, tosse, dor de cabeça, perda de visão, alguma dessas? Não, senhor doutor, é só mesmo aquela dor e esporadicamente algumas dores de barriga. Ok, pronto. E as dores de barriga são muito intensas? Não, não, não. Ok, ok. Pronto, devem estar associada ao que eu estou aqui a pensar. Pronto, e diga-me uma coisa, já teve algum historial de problemas cardíacos ou gastrointestinais? Não, não senhor doutor, nada. Pronto, tomou alguma medicação habitual ou tem alguma alergia conhecida? Não, nada mesmo. Ok, ok, pronto. Olha pronto, segundo o que me está a dizer não parece ser nada de grave, mas ainda assim sei que queres fazer aqui um pequeno exame físico e medir os seus sinais vitais, pode ser? Claro, claro. Pronto, então, vamos aqui ver, portanto, tensão arterial está boa, saturação também, frequência cardíaca também, a temperatura também. Aqui há a auscultação, pronto, também não parece haver alterações. Ok, pronto, o domínio também não parece ter alterações de especial e mais nada. Ok, pronto, então olha, Sr. João, basicamente, tendo em conta a sua idade, já tínhamos visto, tem 35 anos, exatamente. E a ausência de qualquer antecedente de relevo, segundo o que me contou, parece-me tratar-se de um caso de refluxo gastroesofágico. Isto é algo relativamente comum, mas basicamente é o seu estômago que está a produzir um bocadinho mais ácido que o normal. E quando ele se é ácido só para o esôfago, dá esse desconforto no peito e que é principalmente após as refeições ou mesmo à noite. Para apresentar aqui uma espécie de uma prova terapêutica, vou-lhe prescrever um protetor gástrico que é o meprazol 20mg uma vez por dia, durante 4 semanas e à partida, se passar, é a prova de que era mesmo refluxo gastroesofágico. A ideia é fazer mesmo 15 a 30 minutos antes do que era almoço, todos os dias, para fazer efeito. Além desta medicação que vou descrever, também lhe vou aconselhar algumas medidas alimentares, nomeadamente não comer alimentos processados, picantes, café ou beber álcool e pronto, para ajudar na redução da acidez gástrica. Pronto, e daqui a 4 semanas gostava que voltasse cá para vermos como está. À partida, pronto, os sintomas vão passar, mas lá está a casa, tem algum sintoma mais estranho, como por exemplo a dor de não passar, aumentar, febre, dor de cabeça, falta de ar, tosse, pode vir cá antes, pronto. Não sei se tens mais alguma questão. Ok, não, ótimo, é exatamente isso. Obrigado. Pronto, hoje melhor continuação. Obrigado, boa tarde.`;
            const string2 = `Sinais vitais. Tensão arterial 120-90, saturação 96%, frequência cardíaca 90 batimentos por minuto, temperatura 36,4 graus. Auscultação cardiopulmonar sem alterações de relevo, pelo menos sem dor a palpação, sem alterações à percussão ou outras de relevo, sem outras alterações à visão objetivo. Portanto, quadro compatível com refluxo gastroesofágico, sintomas associados, pirose, dor abdominal epigástrica, sem outros sinais ou sintomas de relevo`;

            apT.push(string1);
            docT.push(string2);
            // for (const file of apfiles) {
            //     apT.push(file.transcript);
            // }
            // for (const file of docfiles) {
            //     docT.push(file.transcript);
            // }

            const response = await getReport(apT, docT, openai);
            console.log("Report", response);
            setReport(response?.toString() || "");
        }

        try {
            get();
            // const response = await get()
        } catch (error) {
            console.error(error);
        } finally {
            console.log("Done");
        }

    }, [submitting]);

    useEffect(() => {

        const getHTML = async () => {

            const markdownString = report;
            const converter = new showdown.Converter()
            const html = converter.makeHtml(markdownString);

            setReport(html);
        }

        getHTML();
        setIsReady(true);
    }, [report]);

    return (
        <main className="flex-1 w-full h-full flex flex-col">

            {/* Dialog 1 - Type of Appointment  */}
            <Dialog open={is1Open} onOpenChange={setIs1Open}>
                <DialogContent className="w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Type of Appointment</DialogTitle>
                        <DialogDescription>
                            Select the type of appointment you are going to conduct. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid py-2">
                        <Select onValueChange={setApType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Routine">Routine</SelectItem>
                                    <SelectItem value="Follow-up">Follow-up Visit</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => handleSave()}>Next</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog 2 - Appointment ID */}
            <Dialog open={is2Open} onOpenChange={setIs2Open}>
                <DialogContent className="sm:max-w-[425px] gap-5">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Label htmlFor="id" className="w-[30%]">Patient ID</Label>
                        <Input
                            id="id"
                            placeholder="917856"
                            // defaultValue=""  
                            className="w-full h-8"
                            value={patientID}
                            onChange={(e) => setPatientID(e.target.value)}

                        />
                    </div>
                    <DialogFooter className="w-full flex flex-row sm:justify-between justify-between items-center">
                        <Button variant="outline" onClick={() => handleCancel()}>Do later</Button>
                        <Button type="button" onClick={() => handleSaveID(2)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

            {/* Dialog 3 - REQUIRED Appointment ID */}
            <Dialog open={is3Open} onOpenChange={setIs3Open}>
                <DialogContent className="sm:max-w-[425px] gap-5">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Label htmlFor="id" className="w-[30%]">Patient ID</Label>
                        <Input
                            id="id"
                            placeholder="917856"
                            // defaultValue=""  
                            className="w-full h-8"
                            value={patientID}
                            onChange={(e) => setPatientID(e.target.value)}

                        />
                    </div>
                    <DialogFooter className="w-full flex flex-row sm:justify-between justify-between items-center">
                        <Button variant="outline" onClick={() => handleCancel()}>Do later</Button>
                        <Button type="button" onClick={() => handleSaveID(3)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

            {!submitting &&
                <Tabs defaultValue="appointment-notes" className="flex-1 flex flex-col w-full h-full">

                    <div className="flex-1 w-full h-full px-12 py-12
                flex flex-col gap-8 
                 justify-start items-center">

                        <div className="w-full h-full
                     flex flex-row
                     justify-between items-center
                     ">
                            <h1>New Appointment
                                {!is2Open && patientID.length != 0 && <span className="opacity-60">{` #${patientID}`}</span>}
                            </h1>
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
                                            This action cannot be undone. This will send a request with this unique patient ID to the server.
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

            {submitting && !isReady &&
                <div className="flex-1 w-full h-full gap-12
            flex flex-col justify-center items-center ">
                    <div className="flex flex-col justify-center items-center">
                        <h3>Creating the report...</h3>
                        <p>This may take a few minutes. Please wait for all the changes to be made!</p>
                    </div>
                    <div>
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />

                    </div>
                    <Button variant="destructive" onClick={() => setReport("Interrompi isto")}>Interupt the report building</Button>
                </div>

            }

            {isReady && submitting &&
                <div className="flex-1 w-full h-full gap-12
                flex flex-col justify-center items-center ">
                    <div className="min-w-[40rem] border rounded-md overflow-auto m-4">
                        <div className="w-full py-3 px-8
                         flex flex-row justify-between items-center bg-slate-200">
                            <h4>Report #{patientID}</h4>
                            <Button variant="outline">
                                <DownloadIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="w-full p-8 overflow-x-hidden overflow-y-auto" dangerouslySetInnerHTML={{ __html: report }} />
                        {/* {report} */}

                    </div>
                </div>
            }

        </main >
    );
}