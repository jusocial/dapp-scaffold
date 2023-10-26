import { FindProfilesAsKeysByConnectionInitializerInput, FindProfilesAsKeysByConnectionTargetInput } from "@ju-protocol/sdk";
import { PublicKey } from "@solana/web3.js";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/main";

export function useProfileConnectionInitializers(filter: Omit<FindProfilesAsKeysByConnectionInitializerInput, "app">) {

  const { profileClient } = useContext(AppContext);

  const [profilesAsKeysByConnectionInitializer, setProfilesAsKeysByConnectionInitializers] = useState<PublicKey[]>([]);
  const [profilesAsKeysByConnectionInitializerLoading, setProfilesAsKeysByConnectionInitializerLoading] = useState(false);
  const [profilesAsKeysByConnectionInitializerError, setProfilesAsKeysByConnectionInitializerError] = useState<Error | null>(null);

  const fetchData = () => {
    setProfilesAsKeysByConnectionInitializerLoading(true);
    setProfilesAsKeysByConnectionInitializerError(null);

    profileClient().findProfilesAsKeysByConnectionInitializer(filter)
      .then(data => setProfilesAsKeysByConnectionInitializers(data))
      .catch(error => {
        setProfilesAsKeysByConnectionInitializerError(error);
      })
      .finally(() => {
        setProfilesAsKeysByConnectionInitializerLoading(false);
      })

  }

  useEffect(() => {
    fetchData();
  }, []);

  return { profilesAsKeysByConnectionInitializer, profilesAsKeysByConnectionInitializerLoading, profilesAsKeysByConnectionInitializerError };
}