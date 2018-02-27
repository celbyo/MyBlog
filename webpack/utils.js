const env = process.env.NODE_ENV;
const isDevEnv = env === 'local';

export const fileHash = (fileName) => {
    const name = fileName.split('.');
    if (!isDevEnv) {
        return `${name[0]}-[chunkhash].${name[1]}`;
    }
    return fileName;
};
