import { Box } from "@mui/material"
import AirdropButton from "../components/layouts/AirdropButton"

export default function HomePage() {

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={4}
    >
      <h1>
        Ju Application template
      </h1>

      <AirdropButton />

    </Box>
  )

}