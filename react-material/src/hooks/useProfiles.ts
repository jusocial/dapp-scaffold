import { FindProfilesInput, Profile } from '@ju-protocol/sdk'
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../contexts/main';


export function useProfiles(filter: Omit<FindProfilesInput, "app">) {

  const { profileClient } = useContext(AppContext);
  
  const [profiles, setProfiles] = useState<Profile[]>();
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [profilesError, setProfilesError] = useState<Error | null>(null);

  const fetchData = () => {
    setProfilesLoading(true);
    setProfilesError(null);

    profileClient().findProfiles(filter)
      .then(data => {
        setProfiles(data);
      })
      .catch(error => {
        setProfilesError(error)
      })
      .finally(() => {
        setProfilesLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { profiles, profilesLoading, profilesError };
};