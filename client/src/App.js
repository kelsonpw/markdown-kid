/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import Home from './components/Home';

function App() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
      <Home />
    </div>
  );
}

export default App;
