import path from 'path';

const jsPath = path.join(__dirname, '../javascripts');

const entry = {
    'admin-index': path.join(jsPath, '/admin'),
    'client-index': path.join(jsPath, '/client'),
};

export default entry;
