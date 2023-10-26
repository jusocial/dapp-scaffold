import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ErrorComponent } from "../components/common/ErrorComponent";
import Loader from "../components/common/Loader";
import { useSubspaces } from "../hooks";


export default function SubspaceListPage() {

  const { subspaces, subspacesLoading, subspacesError } = useSubspaces({ loadJsonMetadata: true });

  return (
    <>

      {subspacesLoading &&
        <Loader />
      }

      {subspacesError &&
        <ErrorComponent />
      }

      {subspaces && subspaces.length > 0 &&
        <>
          <h1>Subspaces list</h1>

          <ul>
            {subspaces.map((item, index) => (
              <li>
                <Link
                  component={NavLink}
                  to={`/subspaces/${item.address}`}
                >
                  {`Subspace ${index + 1}: ${item.address}`}
                </Link>
              </li>
            ))}
          </ul>
        </>
      }

    </>
  )

}