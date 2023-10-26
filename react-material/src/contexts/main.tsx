import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { CoreUtilsClient, ConnectionClient, Ju, Profile, ProfileClient, PublicationClient, PublicKey, ReactionClient, SubspaceClient, walletAdapterIdentity, bundlrStorage, ReportClient, mockStorage } from '@ju-protocol/sdk';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getEndpoint } from '../utils/helpers';

const APP = new PublicKey(process.env.REACT_APP_APP!);

export type TAppContext = {
  theme: Theme;
  mode: 'light' | 'dark';
  handleSwitchMode: () => void;
  isMobileMenuOpen: boolean;
  handleMobileMenu: () => void;
  clearState: () => void;

  APP: PublicKey;
  ju: Ju;
  setJu: (ju: Ju) => void;
  profileAddress?: PublicKey;
  profile?: Profile;
  profileLoading: boolean;
  profileError: Error | null;
  setProfile: (profile: Profile) => void;

  profileClient: () => ProfileClient;
  subspaceClient: () => SubspaceClient;
  publicationClient: () => PublicationClient;
  connectionClient: () => ConnectionClient;
  reactionClient: () => ReactionClient;
  reportClient: () => ReportClient;
  utilsClient: () => CoreUtilsClient;
};

export const AppContext = createContext({} as TAppContext);


type Props = {
  children?: React.ReactNode
};
export const AppProvider: React.FC<Props> = ({ children }) => {

  const { connection } = useConnection();
  const wallet = useWallet();

  const [ju, setJu] = useState<Ju>(new Ju(connection));

  const [profileAddress, setProfileAddress] = useState<PublicKey>();

  const [profile, setProfile] = useState<Profile>();
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<Error | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchProfile = async (address: PublicKey) => {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const profile = await profileClient().getProfile(address, true);
      setProfile(profile);
    } catch (error) {
      setProfileError(error as Error);
    } finally {
      setProfileLoading(false);
    }
  }

  // Core Clients for convinience usage
  const profileClient = () => {
    return ju.core().profiles(APP);
  }
  const subspaceClient = () => {
    return ju.core().subspaces(APP);
  }
  const publicationClient = () => {
    return ju.core().publications(APP);
  }
  const connectionClient = () => {
    return ju.core().connections(APP);
  }
  const reactionClient = () => {
    return ju.core().reactions(APP);
  }
  const reportClient = () => {
    return ju.core().reports(APP);
  }
  const utilsClient = () => {
    return ju.core().utils(APP);
  }

  const getModeFromStorage = (): 'light' | 'dark' => {
    if (localStorage.getItem("mode") === 'dark') return 'dark';
    return 'light';
  };

  const [mode, setMode] = useState<'light' | 'dark'>(getModeFromStorage() || 'light');

  const theme = createTheme({
    components: {
      // Name of the component
      MuiAppBar: {
        styleOverrides: {
          root: {
            // TODO
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // TODO
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s',
            textDecoration: 'none',
            // Some CSS
            '&:hover': {
              filter: 'brightness(85%)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // TODO
            '&:hover': {
              // TODO
            },
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? 
        // Light mode
        {
          background: {
            default: '#fff',
          },
          border: '#eee',

        }
        : 
        // dark mode
        {
          background: {
            default: '#222',
          },
          border: '#333',
        }),
      primary: {
        main: '#99cc33',
        light: '#ccff66',
        dark: '#669900',
      },
      secondary: {
        light: '#eee',
        main: '#ccc',
        dark: '#999',
        contrastText: '#ccc',
      },
    },
    typography: {
      allVariants: {

      },
    },
  });

  const clearState = () => {
    setMode('light');
    setProfile(undefined);
  };

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleSwitchMode = () => {
    setMode((currentMode) => {
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  }

  const memoizedValue = useMemo(
    () => ({
      theme,
      mode,
      clearState,
      handleSwitchMode,
      isMobileMenuOpen,
      handleMobileMenu,
      APP,
      ju,
      setJu,
      profileAddress,
      profile,
      profileLoading,
      profileError,
      setProfile,
      profileClient,
      subspaceClient,
      publicationClient,
      connectionClient,
      reactionClient,
      reportClient,
      utilsClient,
    }),
    [
      mode,
      isMobileMenuOpen,
      ju,
      profileAddress,
      profile,
      profileLoading
    ],
  );

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {

      const newJu = new Ju(connection);
      newJu.use(walletAdapterIdentity(wallet))
    
      if (getEndpoint() === 'devnet') {
        newJu.use(bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: 'https://api.devnet.solana.com',
          timeout: 60000,
        }))
      } else {
        newJu.use(mockStorage())
      }

      setJu(newJu);

      const profileAddr = ju.core().pdas().profile({ app: APP, authority: wallet.publicKey });
      setProfileAddress(profileAddr);
      fetchProfile(profileAddr);

    }
  }, [wallet, connection])


  return (
    <AppContext.Provider value={memoizedValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};