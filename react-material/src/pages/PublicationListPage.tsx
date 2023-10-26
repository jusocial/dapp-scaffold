import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ErrorComponent } from "../components/common/ErrorComponent";
import Loader from "../components/common/Loader";
import { useProfiles, usePublications } from "../hooks";


export default function PublicationListPage() {

  const { publications, publicationsLoading, publicationsError } = usePublications({ loadJsonMetadata: true });

  return (
    <>

      {publicationsLoading &&
        <Loader />
      }

      {publicationsError &&
        <ErrorComponent />
      }

      {publications && publications.length > 0 &&
        <>
          <h1>Publications list</h1>

          <ul>
            {publications.map((item, index) => (
              <li>
                <Link
                  component={NavLink}
                  to={`/publications/${item.address}`}
                >
                  {`Publication ${index + 1}: ${item.address}`}
                </Link>
              </li>
            ))}
          </ul>
        </>
      }

    </>
  )

}