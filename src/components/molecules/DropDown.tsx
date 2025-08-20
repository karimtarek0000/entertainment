'use client'

import Button from '@/components/atoms/Button'
import { useClerk, useUser } from '@clerk/nextjs'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import toast from 'react-hot-toast'

export default function DropDown() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const logoutHandler = async () => {
    try {
      await signOut()
      toast.success('Successfully logged out 🤨')
    } catch {
      toast.error('Failed to log out')
    }
  }

  return (
    <Menu>
      <MenuButton className="size-15 uppercase border border-white/50 rounded-full focus:outline-none overflow-hidden">
        {user?.emailAddresses[0]?.emailAddress.split('@')[0][0]}
        {user?.emailAddresses[0]?.emailAddress.split('@')[0][1]}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <Button onClick={logoutHandler}>Logout</Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
