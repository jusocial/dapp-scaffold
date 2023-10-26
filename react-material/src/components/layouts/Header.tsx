import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, Grid, Link } from '@mui/material';
import Settings from "./Settings";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";


export default function Header() {

  return (
    <AppBar
      position="fixed"
      color='primary'
      enableColorOnDark
      sx={{ 
        boxShadow: 0,
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          variant='dense'
        >
          <Grid container spacing={1}>
            <Grid
              item
              sm={2}
              display={'flex'}
              alignItems={'center'}
            >
              <Link
                component={NavLink}
                to="/"
              >
                <img alt='Ju dApp Scaffold' src='/logo.png' height={'30px'} />
              </Link>
            </Grid>

            <Grid
              item
              xs={7} sm={5}
              display={'flex'}
              alignItems={'center'}
              gap={3}
            >
              <Link
                component={NavLink}
                to={'/profiles'}
                sx={{ color: '#fff' }}
              >
                Profiles
              </Link>

              <Link
                component={NavLink}
                to={'/subspaces'}
                sx={{ color: '#fff' }}
              >
                Subspaces
              </Link>

              <Link
                component={NavLink}
                to={'/publications'}
                sx={{ color: '#fff' }}
              >
                Publications
              </Link>

            </Grid>

            <Grid
              item
              xs={3} sm={5}
              display={'flex'}
              justifyContent={'flex-end'}
              alignItems={'center'}
              gap={3}
              color={'#fff'}
            >
              <Settings />

              <WalletMultiButton size='small' variant="outlined" color="inherit"/>
            </Grid>

          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}