import { Program, AnchorProvider, utils, web3, BN } from '@project-serum/anchor';
import {
  getMint,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync
} from '@solana/spl-token';
import { Connection, PublicKey, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import idl from './idl.json';
import * as buffer from 'buffer';
import { toast } from 'react-toastify';
const utf8 = utils.bytes.utf8;
const programID = new PublicKey(idl.metadata.address);
window.Buffer = buffer.Buffer;



const opts = {
  preflightCommitment: 'processed'
};


async function getProvider({ phantomProvider }) {
  /* create the provider and return it to the caller */
  /* network set to local network for now */
  const network = 'https://api.devnet.solana.com';
  const connection = new Connection(network, opts.preflightCommitment);

  let wallet = {
    publicKey: phantomProvider?._publicKey,
    signTransaction: phantomProvider.signTransaction,
    signAllTransactions: phantomProvider.signAllTransactions
  };

  const provider = new AnchorProvider(connection, wallet, opts.preflightCommitment);
  return provider;
}


export const viewDetails = async ({ phantomProvider }) => {
  const provider = await getProvider({ phantomProvider });
  const network = 'https://api.devnet.solana.com';
  const program = new Program(idl, programID, provider);
  const connection = new Connection(network, opts.preflightCommitment);
  const [globalStateAccountPDA] = await web3.PublicKey.findProgramAddress(
    [utf8.encode('global_state')],
    program.programId
  );

  const globalStateAct = await program.account.globalState.fetch(globalStateAccountPDA);
  for (let i = 0; i < globalStateAct.tickerList.length; i++) {
    var [wrappedMintAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('wrapped_mint'), utf8.encode(globalStateAct.tickerList[i])],
      program.programId
    );

    var mint = await getMint(connection, wrappedMintAccountPDA);
    var x = Math.pow(10, mint.decimals);
    console.log(
      'Ticker: ',
      globalStateAct.tickerList[0],
      'Mint: ',
      wrappedMintAccountPDA.toString(),
      'Total Supply: ',
      Number(mint.supply) / x
    );
  }
};

export const burnHandler = async ({
  token,
  setStep,
  tokenValue,
  setClaimStatus,
  phantomProvider
}) => {
  const provider = await getProvider({ phantomProvider });
  const network = 'https://api.devnet.solana.com';
  const connection = new Connection(network, opts.preflightCommitment);
  const program = new Program(idl, programID, provider);
  try {
    const [globalStateAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('global_state')],
      program.programId
    );

    const [configAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('config')],
      program.programId
    );

    const [wrappedMintAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('wrapped_mint'), utf8.encode(token)],
      program.programId
    );

    const [wrappedStateAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('wrapped_state'), utf8.encode(token)],
      program.programId
    );

    const [userAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('user_account'), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const globalStateAct = await program.account.globalState.fetch(globalStateAccountPDA);

    const adminAuth = globalStateAct.adminAuthority;
    const signerAta = getAssociatedTokenAddressSync(wrappedMintAccountPDA, provider.wallet.publicKey, true);

    let trans = await program.methods
      .burnTokens({
        ticker: token,
        amount: new BN(tokenValue),
        chain: 'bitcoin',
        crossChainAddress: 'mybitcoinaddress'
      })
      .accounts({
        globalStateAccount: globalStateAccountPDA,
        configAccount: configAccountPDA,
        wrappedMintAccount: wrappedMintAccountPDA,
        wrappedStateAccount: wrappedStateAccountPDA,
        userAccount: userAccountPDA,
        signerAta: signerAta,
        admin: adminAuth,
        signer: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      })
      .rpc();

    const wrappedStateAct = await program.account.wrappedStateAccount.fetch(wrappedStateAccountPDA);

    const mint = await getMint(connection, wrappedMintAccountPDA);
    console.log(
      'Total Supply of the mint: ',
      mint.supply.toString(),
      mint.isInitialized,
      mint.tlvData.toString()
    );

    setStep(4);
  } catch (error) {
    console.log('Error burning Solana tokens:', error.message);
    setStep(4);
    setClaimStatus('failure');
    toast.error(error.message);
  }
};
