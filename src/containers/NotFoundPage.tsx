import { usePathname } from 'next/navigation'
import { DetailsPage } from './DetailsPage';

export default function NotFoundPage() {
  const pathName = usePathname();
  const [, id] = pathName.split('/');

  console.log(`pathName.split('/').length`, pathName.split('/').length);
  console.log(`pathName.startsWith('/')`, pathName.startsWith('/'));

  if (pathName.split('/').filter(x => x !== '').length === 1 && pathName.startsWith('/')) {
    return <DetailsPage post={{ id }}/>
  }

  return <>404 page: {pathName}</>
}
