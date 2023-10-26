import { useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { usePublication } from "../hooks";
import Loader from "../components/common/Loader";
import { ErrorComponent } from "../components/common/ErrorComponent";


export default function PublicationPage() {

  const { id } = useParams();

  let pk = PublicKey.default;
  try {
    pk = new PublicKey(id!);
  } catch {
    // TODO
  }

  const { publication, publicationLoading, publicationError } = usePublication(pk);

  return (
    <>

      {publicationLoading &&
        <Loader />
      }

      {publicationError &&
        <ErrorComponent />
      }

      {publication &&
        <>
          <h1>Publication data</h1>
          <ul>
            <li>
              <>
                Address: {publication?.address}
              </>
            </li>
            <li>
              <>
                Authority: {publication?.authority}
              </>
            </li>
          </ul>
        </>
      }

    </>
  )

}