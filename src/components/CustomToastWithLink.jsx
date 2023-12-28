export const CustomToastWithLink = () => {
  return (
    <div>
      Seems like you don't have AVAX-C chain added to your metamask wallet.
      Please add Avalanche C-Chain via{" "}
      <a
        href="https://chainlist.org/chain/43114"
        target="_blank"
        rel="noreferrer"
      >
        this link.
      </a>
    </div>
  );
};
