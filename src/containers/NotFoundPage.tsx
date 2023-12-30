import { usePathname } from 'next/navigation'

export default function NotFoundPage() {
  const pathName = usePathname();
  return <>404 page: {pathName}</>
}
