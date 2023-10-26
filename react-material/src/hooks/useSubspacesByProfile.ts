import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';
import { FindSubspacesAsKeysByConnectionTargetInput } from "@ju-protocol/sdk";

export function useSubspacesByProfile(filter: Omit<FindSubspacesAsKeysByConnectionTargetInput, "app">) {

  const { subspaceClient } = useContext(AppContext);

  const [subspacesAsKeysByProfile, setSubspacesAsKeysByProfile] = useState<PublicKey[]>();
  const [subspacesAsKeysByProfileLoading, setSubspacesAsKeysByProfileLoading] = useState(false);
  const [subspacesAsKeysByProfileError, setSubspacesAsKeysByProfileError] = useState<Error | null>(null);

  const fetchData = () => {
    setSubspacesAsKeysByProfileLoading(true);
    setSubspacesAsKeysByProfileError(null);

      subspaceClient().findSubspacesAsKeysByConnectionTarget(filter)
        .then(data => {
          setSubspacesAsKeysByProfile(data)
        })
        .catch(error => setSubspacesAsKeysByProfileError(error))
        .finally(() => {
          setSubspacesAsKeysByProfileLoading(false);
        })
    }

  useEffect(() => {
    fetchData();
  }, []);

  return { subspacesAsKeysByProfile, subspacesAsKeysByProfileLoading, subspacesAsKeysByProfileError };
};