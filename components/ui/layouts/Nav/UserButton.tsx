'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

import { Button } from '../../button'
import { User } from "@/@types/enum"
import { signOut } from "next-auth/react"

const UserAccountNav = ({ user }: { user: User }) => {
    //const { signOut } = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className='overflow-visible'>
                <Button
                    variant='ghost'
                    size='sm'
                    className='relative'>
                    My account
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className='bg-white w-60'
                align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-0.5 leading-none'>
                        <p className='font-medium text-sm text-black'>
                            {user.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/sell'>Seller Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    className='cursor-pointer'>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav