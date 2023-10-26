import { Profile } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { PublicKey } from "@solana/web3.js";
import { AppContext } from '../contexts/main';

export function useProfile(key: PublicKey, loadJsonMetadata = true) {

  const { profileClient } = useContext(AppContext);
  
  const [profile, setProfile] = useState<Profile>();
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<Error | null>(null);

  const fetchData = () => {
    setProfileLoading(true);
    setProfileError(null);

    profileClient().getProfile(key, loadJsonMetadata)
      .then(data => {
        setProfile(data);
      })
      .catch(error => {
        setProfileError(error)
      })
      .finally(() => {
        setProfileLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { profile, profileLoading, profileError };
};