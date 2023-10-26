import { Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { ErrorComponent } from "../components/common/ErrorComponent";
import Loader from "../components/common/Loader";
import { useProfiles } from "../hooks";


export default function ProfileListPage() {

  const { profiles, profilesLoading, profilesError } = useProfiles({ loadJsonMetadata: true });

  return (
    <>

      {profilesLoading &&
        <Loader />
      }

      {profilesError &&
        <ErrorComponent />
      }

      {profiles && profiles.length > 0 &&
        <>
          <h1>Profile list</h1>

          <ul>
            {profiles.map((item, index) => (
              <li>
                <Link
                  component={NavLink}
                  to={`/profiles/${item.address}`}
                >
                  {`Profile ${index + 1}: ${item.address}`}
                </Link>
              </li>
            ))}
          </ul>
        </>
      }

    </>
  )

}