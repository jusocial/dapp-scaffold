import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';
import { FindSubspacesAsKeysInput, FindSubspacesInput, Subspace } from "@ju-protocol/sdk";


export function useSubspacesAsKeys(filter: Omit<FindSubspacesAsKeysInput, "app">) {

  const { subspaceClient } = useContext(AppContext);

  const [subspacesAsKeys, setSubspacesAsKeys] = useState<PublicKey[]>();
  const [subspacesAsKeysLoading, setSubspacesAsKeysLoading] = useState(false);
  const [subspacesAsKeysError, setSubspacesAsKeysError] = useState<Error | null>(null);

  const fetchData = () => {
    setSubspacesAsKeysLoading(true);
    setSubspacesAsKeysError(null);

      subspaceClient().findSubspacesAsKeys(filter)
        .then(data => {
          setSubspacesAsKeys(data)
        })
        .catch(error => setSubspacesAsKeysError(error))
        .finally(() => {
          setSubspacesAsKeysLoading(false);
        })
    }

  useEffect(() => {
    fetchData();
  }, []);

  return { subspacesAsKeys, subspacesAsKeysLoading, subspacesAsKeysError };
};