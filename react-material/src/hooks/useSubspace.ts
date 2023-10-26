import { Ju, Subspace } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';

export function useSubspace(address: PublicKey, loadJsonMetadata = true) {

  const { subspaceClient } = useContext(AppContext);

  const [subspace, setSubspace] = useState<Subspace>();
  const [subspaceLoading, setSubspaceLoading] = useState(false);
  const [subspaceError, setSubspaceError] = useState<Error | null>(null);

  const fetchData = () => {
      setSubspaceLoading(true);
      setSubspaceError(null);

      subspaceClient().getSubspace(address, loadJsonMetadata)
      .then(data => {
        setSubspace(data)
      })
      .catch(error => setSubspaceError(error))
      .finally(() => {
        setSubspaceLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { subspace, subspaceLoading, subspaceError };
};