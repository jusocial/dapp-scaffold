import { GitHub, Language, MenuBook, Twitter, YouTube } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <Box
      component='footer'
      borderTop={(theme) => `1px solid ${theme.palette.divider}`}
      color={(theme) => theme.palette.text.disabled}
      fontSize={'0.9rem'}
    >
      <Container
        maxWidth="lg">
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <img alt='Ju dApp' src='/logo-gray.png' height={'30px'} />
          </Box>

          <Box
            display={'flex'}
            alignItems={'center'}
            gap={1}
          >
            <IconButton
              size="small"
              component={Link}
              to={'https://github.com/jusocial'}
              target={'_blank'}
            >
              <GitHub fontSize="small" color="primary"/>
            </IconButton>

            <IconButton
              size="small"
              component={Link}
              to={'https://ju.social'}
              target={'_blank'}
            >
              <Language fontSize="small" color="primary"/>
            </IconButton>

            <IconButton
              size="small"
              component={Link}
              to={'https://docs.ju.social'}
              target={'_blank'}
            >
              <MenuBook fontSize="small" color="primary"/>
            </IconButton>

            <IconButton
              size="small"
              component={Link}
              to={'https://www.youtube.com/@jusocial'}
              target={'_blank'}
            >
              <YouTube fontSize="small" color="primary"/>
            </IconButton>

            <IconButton
              size="small"
              component={Link}
              to={'https://twitter.com/juprotocol'}
              target={'_blank'}
            >
              <Twitter fontSize="small" color="primary"/>
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}