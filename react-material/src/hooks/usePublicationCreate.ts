import { CreatePublicationInput, Publication, SendAndConfirmTransactionResponse } from '@ju-protocol/sdk'
import { useState, useEffect, useContext, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';


export function usePublicationCreate(input: Omit<CreatePublicationInput, "app">) {

  const { publicationClient } = useContext(AppContext);

  const [publicationAddress, setPublicationAddress] = useState<PublicKey>();
  const [publication, setPublication] = useState<Publication>();
  const [response, setResponse] = useState<SendAndConfirmTransactionResponse>();

  const [publicationCreateLoading, setPublicationCreateLoading] = useState(false);
  const [publicationCreateError, setPublicationCreateError] = useState<Error | null>(null);

  const createPublication = useCallback(
    async () => {
      setPublicationCreateLoading(true);
      setPublicationCreateError(null);

      try {
        const { publicationAddress, publication, response } = await publicationClient().createPublication(input);
        setPublicationAddress(publicationAddress);
        setPublication(publication);
        setResponse(response);
      } catch (err: any) {
        setPublicationCreateError(err);
      } finally {
        setPublicationCreateLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    createPublication();
  }, [createPublication]);

  return { createPublication, publicationAddress, publication, response, publicationCreateLoading, publicationCreateError };
};