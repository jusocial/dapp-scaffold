import { WaterDrop } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';


export default function AirdropButton() {

  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log('error', 'Wallet not connected!');
      enqueueSnackbar('Wallet not connected');
      return;
    }

    let signature: TransactionSignature = '';

    try {
      setIsSubmitProcessing(true);
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

      // Get the lates block hash to use on our transaction and confirmation
      let latestBlockhash = await connection.getLatestBlockhash()
      await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

      enqueueSnackbar('Airdrop successful!');
      enqueueSnackbar("Airdrop successful!");

      setIsSubmitProcessing(false);

    } catch (error: any) {
      enqueueSnackbar(`Airdrop failed!`);
      console.log('error', `Airdrop failed! ${error?.message}`, signature);
      setIsSubmitProcessing(false);
    }
  }, [publicKey, connection]);

  return (

    <>
      <Button
        size='small'
        variant="outlined"

        disabled={!connected}
        startIcon={isSubmitProcessing ? <CircularProgress color="inherit" size={16} /> : <WaterDrop />}

        onClick={onClick}
      >
        Airdrop me
      </Button>
    </>
  );
};