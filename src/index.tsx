import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";

import WeddingInvitation from "./App";


render(
    () => (
        <Router>
          <Route path="/" component={WeddingInvitation} />
        </Router>
    ),
    document.getElementById('root')!
);


