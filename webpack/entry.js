import path from 'path';

const jsPath = path.join(__dirname, '../javascripts');

const entry = {
    'admin-index':
        // [
        // 'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://localhost:8080',
        // 'webpack/hot/only-dev-server',
        path.join(jsPath, '/admin')
    // ]
    ,
    'client-index': path.join(jsPath, '/client'),
};

export default entry;
