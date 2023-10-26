import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';
import { FindSubspacesInput, Subspace } from "@ju-protocol/sdk";


export function useSubspaces(filter: Omit<FindSubspacesInput, "app">) {

  const { subspaceClient } = useContext(AppContext);

  const [subspaces, setSubspaces] = useState<Subspace[]>();
  const [subspacesLoading, setSubspacesLoading] = useState(false);
  const [subspacesError, setSubspacesError] = useState<Error | null>(null);

  const fetchData = () => {
      setSubspacesLoading(true);
      setSubspacesError(null);

      subspaceClient().findSubspaces(filter)
        .then(data => {
          setSubspaces(data)
        })
        .catch(error => setSubspacesError(error))
        .finally(() => {
          setSubspacesLoading(false);
        })
    }

  useEffect(() => {
    fetchData();
  }, []);

  return { subspaces, subspacesLoading, subspacesError };
};