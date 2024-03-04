import app from './app.js';
import {node} from './config/teto.js';

app.listen(node.port || 8080, () => {
  console.log("Server listening on port 8080");
});
