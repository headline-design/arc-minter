export const NONE_YET = 'none yet';
export const PREFERRED_DECIMALS = 2;

/** Local Storage keys */

export const PIPECONNECT_STATE_KEY = 'pipeConnectState';

/** Networks */

export const Networks: any = {
  MainNet: 'MainNet',
  TestNet: 'TestNet',
};

/** INDEXERS */

export const Indexers: any = {
  AlgoExplorer: 'AlgoExplorer',
  AlgoNode: 'AlgoNode',
};

export const DEFAULT_INDEXER = Indexers.AlgoExplorer;

export const AlgoExplorerBaseUrl = (net: boolean) =>
  `https://${net ? '' : 'testnet.'}algoexplorer.io`;

export const IndexerProps = (indexer: string, net: boolean) => {
  const indexers: any = {
    AlgoExplorer: {
      NODE: `https://node.${net ? '' : 'testnet.'}algoexplorerapi.io`,
      INDEXER: `https://algoindexer.${net ? '' : 'testnet.'}algoexplorerapi.io`,
      BASE_INDEXER: `https://indexer.algoexplorerapi.io`,
      PRICE: `https://price.algoexplorerapi.io/price`,
    },
    AlgoNode: {
      NODE: `https://${net ? 'mainnet' : 'testnet'}-api.algonode.cloud`,
      INDEXER: `https://${net ? 'mainnet' : 'testnet'}-idx.algonode.cloud`,
      BASE_INDEXER: `https://indexer.algoexplorerapi.io`,
      PRICE: `https://price.algoexplorerapi.io/price`,
    },
  };
  return indexers[indexer];
};
