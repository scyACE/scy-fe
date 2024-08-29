import ora from 'ora';
// import scanAction from './actions/scan';
import initAction from './actions/init';
import { PKG_NAME } from './utils/constants';
// import printReport from './utils/print-report';
import type { InitOptions, ScanOptions } from './types';

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

export const init = async (options: IInitOptions) => {
  return await initAction({
    ...options,
    checkVersionUpdate: false,
  });
};
