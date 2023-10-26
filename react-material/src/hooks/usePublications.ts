import { FindPublicationsInput, Publication } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';


export function usePublications(filter: FindPublicationsInput) {

  const { publicationClient } = useContext(AppContext);

  const [publications, setPublications] = useState<Publication[]>();
  const [publicationsLoading, setPublicationsLoading] = useState(false);
  const [publicationsError, setPublicationsError] = useState<Error | null>(null);

  const fetchData = () => {
    setPublicationsLoading(true);
    setPublicationsError(null);

    publicationClient().findPublications(filter)
      .then(data => {
        setPublications(data)
      })
      .catch(error => setPublicationsError(error))
      .finally(() => {
        setPublicationsLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { publications, publicationsLoading, publicationsError };
};