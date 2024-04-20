"use client"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/set-theme"
import { PersonIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import icon from "@/public/images/icon.svg"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"


export default function Navbar() {
    const { theme, setTheme } = useTheme()
    console.log(theme)

    return (
        <nav className=" top-0 left-0 w-full z-50 
        bg-[#1d202a] 
        px-12 py-8 flex
        flex-row justify-between items-center">
            <Link href="/">
                <Image src={icon} alt="hedit-icon" className="h-10 w-fit" />
            </Link>

            <div className="flex flex-row justify-between items-center gap-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem className="bg-transparent">
                            <Link className="bg-transparent" href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/previous-appointment" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Previous Appointments
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/new-appointment" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    New Appointment
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile & Account
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Keyboard shortcuts
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>
                            <DropdownMenu>
                                    <Button variant="ghost" size="icon" className="w-full"
                                    onClick={() => theme=="light" ? setTheme("light") : setTheme("dark")}>
                                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                            </DropdownMenu>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>

                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </div>

        </nav>
    );
}