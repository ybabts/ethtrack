import { getEthereumPrice } from './ethereum.js';
import oak from 'oak';
import view_engine from 'view_engine';

const ejsEngine = oak.engineFactory.getEjsEngine();
const oakAdapter = oak.adapterFactory.getOakAdapter();
let data = await getEthereumPrice();
let ethText: string = data[0] + ':' + data[1];
const app = new view_engine.Application();
app.use(view_engine.viewEngine(oakAdapter, ejsEngine));
app.use(
    async (ctx, next) => {
        ctx.render('index.ejs', {data: {msg: ethText}});
    }
);
await app.listen({port: 8000});