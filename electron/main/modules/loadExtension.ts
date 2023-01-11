const { session } = require('electron');
import { join } from 'path';
process.env.DIST = join(__dirname, '../..');
export default function initLoadExtension() {
    session.defaultSession
    .loadExtension(join(process.env.DIST, '../public/plugins/devtools-chrome'))
    .then(({ id }) => {}).catch(()=>{})
}