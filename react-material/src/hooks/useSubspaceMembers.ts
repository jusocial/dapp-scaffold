import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';
import { FindSubspacesAsKeysByConnectionInitializerInput } from "@ju-protocol/sdk";


export function useSubspaceMembers(filter: Omit<FindSubspacesAsKeysByConnectionInitializerInput, "app">) {

  const { subspaceClient } = useContext(AppContext);

  const [subspacesAsKeysByConnectionInitializer, setSubspacesAsKeysByConnectionInitializer] = useState<PublicKey[]>();
  const [subspacesAsKeysByConnectionInitializerLoading, setSubspacesAsKeysByConnectionInitializerLoading] = useState(false);
  const [subspacesAsKeysByConnectionInitializerError, setSubspacesAsKeysByConnectionInitializerError] = useState<Error | null>(null);

  const fetchData = () => {
    setSubspacesAsKeysByConnectionInitializerLoading(true);
    setSubspacesAsKeysByConnectionInitializerError(null);

    subspaceClient().findSubspacesAsKeysByConnectionInitializer(filter)
      .then(data => {
        setSubspacesAsKeysByConnectionInitializer(data)
      })
      .catch(error => setSubspacesAsKeysByConnectionInitializerError(error))
      .finally(() => {
        setSubspacesAsKeysByConnectionInitializerLoading(false);
      })

  }

  useEffect(() => {
    fetchData();
  }, []);

  return { subspacesAsKeysByConnectionInitializer, subspacesAsKeysByConnectionInitializerLoading, subspacesAsKeysByConnectionInitializerError };
};