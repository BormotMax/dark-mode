import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';

import LogoLoader from '../components/logoLoader/logoLoader';

const HireRedirect = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [noPage, setNoPage] = useState(false);

  useEffect(
    () => {
      if (!id) {
        setIsLoading(true);
        return;
      }
      const [hire, page] = typeof id === 'string' ? [id] : id;
      if (hire === 'hire') {
        router.push(`/${page}`)
          .catch(() => setNoPage(true));
      } else {
        setIsLoading(false);
      }
    },
    [id, router],
  );

  const isError = !isLoading || noPage;
  return (
    <>
      <LogoLoader loading={isLoading} />
      {isError && <DefaultErrorPage statusCode={404} />}
    </>
  );
};

export default HireRedirect;
