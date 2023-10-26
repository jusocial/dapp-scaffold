import { Publication } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';


export function usePublication(address: PublicKey, loadJsonMetadata = true) {

  const { publicationClient } = useContext(AppContext);

  const [publication, setPublication] = useState<Publication>();
  const [publicationLoading, setPublicationLoading] = useState(false);
  const [publicationError, setPublicationError] = useState<Error | null>(null);

  const fetchData = () => {
    setPublicationLoading(true);
    setPublicationError(null);

    publicationClient().getPublication(address, loadJsonMetadata)
      .then(data => {
        setPublication(data)
      })
      .catch(error => setPublicationError(error))
      .finally(() => {
        setPublicationLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { publication, publicationLoading, publicationError };
};