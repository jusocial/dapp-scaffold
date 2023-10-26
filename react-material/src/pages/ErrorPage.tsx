import { Container } from "@mui/material"
import React from "react"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import { ErrorComponent } from "../components/common/ErrorComponent"

export default function ErrorPage() {

  return (
    <>
      <Header />

      <div id="main">
        <Container maxWidth="lg">
          <ErrorComponent />
        </Container>
      </div>

      <Footer />
    </>
  )

}