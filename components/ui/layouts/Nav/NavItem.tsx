'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Link } from '@chakra-ui/react'
import { useState } from 'react'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
    category: Category
    handleOpen: () => void
    close: () => void
    isOpen: boolean
    isAnyOpen: boolean
}

const NavItem = ({
    isAnyOpen,
    category,
    handleOpen,
    close,
    isOpen,
}: NavItemProps) => {
    return (
        <div className='relative flex items-center'>
            <Button
                className='gap-1.5'
                onClick={handleOpen}
                variant={isOpen ? 'secondary' : 'ghost'}
            >
                {category.label}
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-all text-muted-foreground',
                        {
                            '-rotate-180': isOpen,
                        }
                    )}
                />
            </Button>

            {isOpen && (
                <div
                    onClick={() => close()}
                    className={cn(
                        'absolute inset-x-0 top-full mt-2 text-sm text-muted-foreground bg-white shadow-lg rounded-md',
                        {
                            'animate-in fade-in-10 slide-in-from-top-5':
                                !isAnyOpen,
                        }
                    )}
                >
                    <div className='py-2 px-4 w-10'>
                        {category.featured.map((item) => (
                            <Link color={'blue.600'} _hover={{ color: 'green.200' }} href={item.href} key={item.name} className='flex items-center py-2 px-4 hover:bg-gray-200'>
                                <h1 className='text-sm'>{item.name}</h1>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavItem
