import { Brightness4, Brightness7, Close, Settings as SettingsIcon } from "@mui/icons-material";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, Radio, RadioGroup, TextField, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/main";
import { Network } from "../../libs/types";
import { getEndpoint, getNetwork, saveCustomRpcToStorage, saveNetwork } from "../../utils/helpers";

export default function Settings() {

  const theme = useTheme();

  const { handleSwitchMode } = useContext(AppContext);

  const network = getNetwork();
  const isCustomEndpointEnabled = (localStorage.getItem("isCustomEndpointEnabled") === 'true');
  const endpoint = getEndpoint();

  const [cluster, setCluster] = useState<Network>(network);
  const [isCustomRpcEnabled, setisCustomRpcEnabled] = useState(isCustomEndpointEnabled);
  const [customRpcValue, setCustomRpcValue] = useState(endpoint);

  const modeHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    handleSwitchMode();
  }

  const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setCluster(value as Network);
    saveNetwork(value as Network);
  };

  const handleIsCustomRpcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setisCustomRpcEnabled(isChecked);
    localStorage.setItem("isCustomEndpointEnabled", String(isChecked));
  };

  const handleCustomRpcApply = () => {
    saveCustomRpcToStorage(customRpcValue);
    console.log(localStorage.getItem('endpoint'))
  };

  // Settings dialog
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{ color: '#fff' }}
      >
        <SettingsIcon />
      </IconButton>

      <Dialog
        fullWidth
        maxWidth={'xs'}
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            gap={2}
            alignItems={'center'}
          >
            <SettingsIcon fontSize="inherit" />
            Settings
          </Box>

          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>

          <Box
            py={'30px'}
          // sx={{ minHeight: '200px' }}
          >
            <Box
              mb={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box
                sx={{ color: theme => `${!isCustomRpcEnabled ? theme.palette.text.primary : theme.palette.text.disabled}` }}
              >
                Cluster:
              </Box>

              <RadioGroup
                row
                aria-labelledby="cluster-radio-group-label"
                defaultValue={cluster}
                name="cluster-radio-group"

                onChange={handleClusterChange}
              >
                <FormControlLabel
                  value="devnet"
                  control={
                    <Radio
                      disabled={isCustomRpcEnabled}
                    />}
                  label="Devnet"
                  labelPlacement='start'
                />

                <FormControlLabel
                  value="localnet"
                  control={
                    <Radio
                      disabled={isCustomRpcEnabled}
                    />
                  }
                  label="Localnet"
                  labelPlacement='start'
                />
              </RadioGroup>
            </Box>

            <Box
            // display={'flex'}
            // justifyContent={'space-between'}
            // alignItems={'center'}
            >
              <FormGroup
                sx={{ color: theme => `${isCustomRpcEnabled ? theme.palette.text.primary : theme.palette.text.disabled}` }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={isCustomRpcEnabled}
                      onChange={handleIsCustomRpcChange}
                    />
                  }
                  label="Custom RPC"
                />
              </FormGroup>

              <Box
                display={'flex'}
                // justifyContent={'space-between'}
                alignItems={'center'}
              >
                <TextField
                  fullWidth
                  disabled={!isCustomRpcEnabled}
                  size="small"

                  value={customRpcValue}

                  // sx={{
                  //   minWidth: { xs: `100%`, sm: `60%` }
                  // }}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" >
                        <Button
                          disabled={!isCustomRpcEnabled}
                          variant="text"
                          size='small'

                          onClick={handleCustomRpcApply}
                          >
                          Apply
                        </Button>
                      </InputAdornment>
                    )
                  }}

                  onChange={e => setCustomRpcValue(e.target.value)}
                />

              </Box>
            </Box>
          </Box>

          <Divider variant="middle" sx={{ my: 2 }} />

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >

            <Box>
              Switch theme:
            </Box>

            <IconButton
            onClick={modeHandler}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

          </Box>

        </DialogContent>

      </Dialog>

    </>
  )
}