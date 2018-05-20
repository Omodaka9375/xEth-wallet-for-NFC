import Web3 from 'web3';
import logger from '../utils/logger';
import { ethereumNetwork } from '../config.json';

const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNetwork));

const create = () => web3.eth.accounts.create();

const getBalance = (ethAddress = null) => {
  return new Promise((resolve, reject) => {
    if (!web3.utils.isAddress(ethAddress)) {
      logger.error('WalletService', 'getBalance', 'not a valid address');

      return reject({
        errorCode: 400,
        error: `${ethAddress} is not a valid address`
      });
    }

    web3.eth.getBalance(ethAddress, web3.eth.defaultBlock, (error, result) => {
      if (error) {
        logger.error('WalletService', 'getBalance', error);

        return reject({
          errorCode: 500,
          error: error.message
        });
      }

      return resolve({
        ethAddress,
        balance: web3.utils.fromWei(result)
      });
    });
  });
};

const transaction = ({ privateKey, destination, amount }) => {
  return new Promise((resolve, reject) => {
    let account = null;

    if (
      !privateKey ||
      !amount ||
      !destination ||
      !(amount > 0) ||
      !web3.utils.isAddress(destination)
    ) {
      logger.error(
        'WalletService',
        'transaction',
        'invalid transaction parameters'
      );

      reject({
        errorCode: 400,
        error: 'invalid transaction parameters'
      });
    }

    try {
      account = web3.eth.accounts.privateKeyToAccount(privateKey);
    } catch (error) {
      logger.error(
        'WalletService',
        'transaction',
        'could not match private key to an account'
      );

      reject({
        errorCode: 400,
        error: 'could not match private key to an account'
      });
    }

    account
      .signTransaction({
        to: destination,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 4700000
      })
      .then(
        transaction => {
          web3.eth
            .sendSignedTransaction(transaction.rawTransaction)
            .once('transactionHash', hash => {
              resolve({
                TxHash: hash
              });
            })
            .once('receipt', receipt =>
              logger.info('WalletService', 'transaction', 'receipt', receipt)
            )
            .on('error', error => {
              logger.error('WalletService', 'transaction', error.message);

              reject({
                errorCode: 500,
                error: error.message
              });
            });
        },
        error => {
          logger.error('WalletService', 'transaction', error.message);

          reject({
            errorCode: 500,
            message: error.message
          });
        }
      );
  });
};

export { create, getBalance, transaction };
