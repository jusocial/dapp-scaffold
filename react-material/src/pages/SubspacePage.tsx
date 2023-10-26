import { useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { useSubspace } from "../hooks";
import Loader from "../components/common/Loader";
import { ErrorComponent } from "../components/common/ErrorComponent";


export default function SubspacePage() {

  const { id } = useParams();

  let pk = PublicKey.default;
  try {
    pk = new PublicKey(id!);
  } catch {
    // TODO
  }

  const { subspace, subspaceLoading, subspaceError }= useSubspace(pk);

  return (
    <>

      {subspaceLoading &&
        <Loader />
      }

      {subspaceError &&
        <ErrorComponent />
      }

      {subspace &&
        <>
          <h1>Subspace data</h1>
          <ul>
            <li>
              <>
                Address: {subspace?.address}
              </>
            </li>
            <li>
              <>
                Authority: {subspace?.authority}
              </>
            </li>
          </ul>
        </>
      }

    </>
  )

}