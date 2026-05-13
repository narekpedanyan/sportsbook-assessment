import Link from 'next/link'

import ThemeSwitcher from '@/components/core/ThemeSwitcher'

const Header = () => {
  return (
    <header className="border-border flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-sm">
      <Link href="/" className="font-bold tracking-tight">
        Sportsbook
      </Link>
      <ThemeSwitcher />
    </header>
  )
}

export default Header
