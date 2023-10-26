import { FindProfilesInput } from '@ju-protocol/sdk'
import { PublicKey } from '@solana/web3.js';
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../contexts/main';


export function useProfilesAsKeys(filter: Omit<FindProfilesInput, "app">) {

  const { profileClient } = useContext(AppContext);
  
  const [profilesAsKeys, setProfilesAsKeys] = useState<PublicKey[]>();
  const [profilesAsKeysLoading, setProfilesAsKeysLoading] = useState(false);
  const [profilesAsKeysError, setProfilesAsKeysError] = useState<Error | null>(null);

  const fetchData = () => {
    setProfilesAsKeysLoading(true);
    setProfilesAsKeysError(null);

    profileClient().findProfilesAsKeys(filter)
      .then(data => {
        setProfilesAsKeys(data);
      })
      .catch(error => {
        setProfilesAsKeysError(error)
      })
      .finally(() => {
        setProfilesAsKeysLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { profilesAsKeys, profilesAsKeysLoading, profilesAsKeysError };
};