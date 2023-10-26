import { FindProfilesAsKeysByConnectionTargetInput } from "@ju-protocol/sdk";
import { PublicKey } from "@solana/web3.js";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/main";


// Followers / Friends / Connection initializers

export function useProfileConnectionTargets(filter: Omit<FindProfilesAsKeysByConnectionTargetInput, "app">) {

  const { profileClient } = useContext(AppContext);

  const [profilesAsKeysByConnectionTarget, setProfilesAsKeysByConnectionTarget] = useState<PublicKey[]>([]);
  const [profilesAsKeysByConnectionTargetLoading, setProfilesAsKeysByConnectionTargetLoading] = useState(false);
  const [profilesAsKeysByConnectionTargetError, setProfilesAsKeysByConnectionTargetError] = useState<Error | null>(null);

  const fetchData = () => {
    setProfilesAsKeysByConnectionTargetLoading(true);
    setProfilesAsKeysByConnectionTargetError(null);

    profileClient().findProfilesAsKeysByConnectionTarget(filter)
      .then(data => setProfilesAsKeysByConnectionTarget(data))
      .catch(error => {
        setProfilesAsKeysByConnectionTargetError(error);
      })
      .finally(() => {
        setProfilesAsKeysByConnectionTargetLoading(false);
      })

  }

  useEffect(() => {
    fetchData();
  }, []);

  return { profilesAsKeysByConnectionTarget, profilesAsKeysByConnectionTargetLoading, profilesAsKeysByConnectionTargetError };
}