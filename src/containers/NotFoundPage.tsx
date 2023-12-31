import { usePathname } from 'next/navigation'
import { DetailsPage } from './DetailsPage';

export default function NotFoundPage() {
  const pathName = usePathname();
  const [, id] = pathName?.split('/') ?? [];

  if (pathName?.split('/').filter(x => x !== '').length === 1 && pathName.startsWith('/')) {
    return <DetailsPage item={{ id }}/>
  }

  return <>404 page: {pathName}</>
}
