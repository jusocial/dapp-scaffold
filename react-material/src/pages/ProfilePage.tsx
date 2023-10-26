import { useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { useProfile } from "../hooks";
import Loader from "../components/common/Loader";
import { ErrorComponent } from "../components/common/ErrorComponent";


export default function ProfilePage() {

  const { id } = useParams();

  let pk = PublicKey.default;
  try {
    pk = new PublicKey(id!);
  } catch {
    // TODO
  }

  const { profile, profileLoading, profileError } = useProfile(pk);

  return (
    <>

      {profileLoading &&
        <Loader />
      }

      {profileError &&
        <ErrorComponent />
      }

      {profile &&
        <>
          <h1>Profile data</h1>
          <ul>
            <li>
              <>
                Address: {profile?.address}
              </>
            </li>
            <li>
              <>
                Authority: {profile?.authority}
              </>
            </li>
          </ul>
        </>
      }

    </>
  )

}