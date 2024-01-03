import {
  getMint,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync
} from '@solana/spl-token';
import { Connection, PublicKey, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, AnchorProvider, utils, web3, BN } from '@project-serum/anchor';
import idl from './idl.json';
import * as buffer from 'buffer';
import { toast } from 'react-toastify';
import { useReducer } from 'react';
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

export const viewDetails = async ({ phantomProvider, setMetamaskResponse, address }) => {
  const provider = await getProvider({ phantomProvider });
  const network = 'https://api.devnet.solana.com';
  const program = new Program(idl, programID, provider);
  const connection = new Connection(network, opts.preflightCommitment);
  const [globalStateAccountPDA] = await web3.PublicKey.findProgramAddress(
    [utf8.encode('global_state')],
    program.programId
  );

  const globalStateAct = await program.account.globalState.fetch(globalStateAccountPDA);
  let minTokenList = [];
  let pendingTickerList = [];
  // for (let i = 0; i < globalStateAct.tickerList.length; i++) {
  //   var [wrappedMintAccountPDA] = await web3.PublicKey.findProgramAddress(
  //     [utf8.encode('wrapped_mint'), utf8.encode(globalStateAct.tickerList[i])],
  //     program.programId
  //   );
  //   var mint = await getMint(connection, wrappedMintAccountPDA);
  //   var x = Math.pow(10, mint.decimals);
  //   minTokenList.push(Number(mint.supply) / x);
  // }
  const solAddress = new PublicKey(address);
  const [userAccountPDA] = await web3.PublicKey.findProgramAddress(
    [utf8.encode('user_account'), solAddress.toBuffer()],
    program.programId
  );
  const userData = await program.account.userAccount.fetch(userAccountPDA);
  console.log(userData.pendingClaims);
  userData.pendingClaims.map((e) => {
    pendingTickerList.push(e.ticker);
    minTokenList.push(e.amount.toString());
  });
  setMetamaskResponse([pendingTickerList, minTokenList]);
};

export const burnHandler = async ({
  token,
  setStep,
  tokenValue,
  setClaimStatus,
  phantomProvider,
  toAddress
}) => {
  console.log('>>>>>>>>>>>>>>>>>Burnhandler', token);
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
    const signerAta = getAssociatedTokenAddressSync(
      wrappedMintAccountPDA,
      provider.wallet.publicKey,
      true
    );
    //vverify that chains value is solana
    let trans = await program.methods
      .burnTokens({
        ticker: token,
        amount: new BN(tokenValue),
        chain: 'sol',
        crossChainAddress: toAddress
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

    console.log('>>>>>>>>>>>>>>>>>trans', trans);

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

export const claimTokens = async ({ ticker, phantomProvider }) => {
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
      [utf8.encode('wrapped_mint'), utf8.encode(ticker)],
      program.programId
    );

    const [wrappedStateAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('wrapped_state'), utf8.encode(ticker)],
      program.programId
    );

    const [userAccountPDA] = await web3.PublicKey.findProgramAddress(
      [utf8.encode('user_account'), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const globalStateAct = await program.account.globalState.fetch(globalStateAccountPDA);

    const adminAuth = globalStateAct.adminAuthority;
    const signerAta = getAssociatedTokenAddressSync(
      wrappedMintAccountPDA,
      provider.wallet.publicKey,
      true
    );
    const adminAta = getAssociatedTokenAddressSync(wrappedMintAccountPDA, adminAuth, true);

    console.log(
      globalStateAccountPDA.toString(),
      wrappedMintAccountPDA.toString(),
      userAccountPDA.toString(),
      wrappedStateAccountPDA.toString()
    );

    let trans = await program.methods
      .claimTokens({
        ticker: ticker
      })
      .accounts({
        globalStateAccount: globalStateAccountPDA,
        configAccount: configAccountPDA,
        wrappedMintAccount: wrappedMintAccountPDA,
        wrappedStateAccount: wrappedStateAccountPDA,
        userAccount: userAccountPDA,
        signerAta: signerAta,
        adminAta: adminAta,
        admin: adminAuth,
        signer: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      })
      .rpc();

    console.log('trans', trans);

    const wrappedStateAct = await program.account.wrappedStateAccount.fetch(wrappedStateAccountPDA);

    const mint = await getMint(connection, wrappedMintAccountPDA);
    console.log(
      'Total Supply of the mint: ',
      mint.supply.toString(),
      mint.isInitialized,
      mint.tlvData.toString()
    );

    const userData = await program.account.userAccount.fetch(userAccountPDA);
    userData.pendingClaims.map((e) => console.log(e.ticker, e.amount.toString()));
    console.log('Global State Account PDA: ', globalStateAccountPDA.toString());
    console.log(globalStateAct.bridgedAssets.toString(), globalStateAct.userAccounts.toString());
    console.log('State Account Contains: ', wrappedStateAccountPDA);
    console.log(wrappedStateAct.maxSupply.toString(), wrappedStateAct.ticker.toString());
  } catch (err) {
    console.log('Transaction error: ', err);
  }
};
