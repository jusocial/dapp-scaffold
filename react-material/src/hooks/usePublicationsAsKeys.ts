import { FindPublicationsInput, Publication } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';

// const app = new PublicKey(process.env.REACT_APP_APP!);

export function usePublicationsAsKeys(filter: FindPublicationsInput) {

  const { publicationClient } = useContext(AppContext);

  const [publicationsAsKeys, setPublicationsAsKeys] = useState<Publication[]>();
  const [publicationsAsKeysLoading, setPublicationsAsKeysLoading] = useState(false);
  const [publicationsAsKeysError, setPublicationsAsKeysError] = useState<Error | null>(null);

  const fetchData = () => {
    setPublicationsAsKeysLoading(true);
    setPublicationsAsKeysError(null);

    publicationClient().findPublications(filter)
      .then(data => {
        setPublicationsAsKeys(data)
      })
      .catch(error => setPublicationsAsKeysError(error))
      .finally(() => {
        setPublicationsAsKeysLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { publicationsAsKeys, publicationsAsKeysLoading, publicationsAsKeysError };
};