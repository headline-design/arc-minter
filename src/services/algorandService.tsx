import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default class AlgorandService {
  static async getAlgorandGlobal() {
    const to = Math.floor(Date.now() / 1000);
    const from = to - 31536000;
    const algoPriceUrl = `https://price.algoexplorerapi.io/price/algo-usd/history?since=${from}&until=${to}&interval=1D`;
    const {
      data: { history },
    } = await axios.get(algoPriceUrl);

    const marketCapUrl = `https://indexer.algoexplorerapi.io/stats/v2/economics?interval=1W`;
    const {
      data: { data },
    } = await axios.get(marketCapUrl);

    return {
      algoPriceData: history,
      marketCapData: data,
    };
  }
}
