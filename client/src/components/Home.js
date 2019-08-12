/** @jsx jsx */

import { useState, useCallback } from 'react';
import { css, jsx } from '@emotion/core';
import marked from 'marked';
import usePusher from '../hooks/usePusher';

const styles = {
  title: css({
    marginBottom: 40,
  }),
  editor: css({
    padding: 20,
  }),
  preview: css({
    border: '2px solid black',
    textAlign: 'left',
    padding: 20,
  }),
};

function Home() {
  const [inputText, setInputText] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const updateInput = useCallback(
    input => {
      setInputText(input);
      setMarkdown(marked(input));
    },
    [setInputText, setMarkdown]
  );

  const triggerEvent = usePusher(
    'private-markdown',
    'client-md-event',
    updateInput
  );

  const triggerUpdate = useCallback(
    evt => {
      const { value } = evt.target;
      updateInput(value);
      triggerEvent(value);
    },
    [updateInput, triggerEvent]
  );

  return (
    <div>
      <div css={styles.title}>
        <h2>Realtime Markdown Editor</h2>
      </div>

      <div className="row">
        <div className="col-md-6">
          <textarea
            cols="80"
            css={styles.editor}
            id="markdown"
            name="markdown"
            onChange={triggerUpdate}
            value={inputText || ''}
            rows="15"
          />
        </div>
        <div
          css={styles.preview}
          className="col-md-6"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
    </div>
  );
}

export default Home;
