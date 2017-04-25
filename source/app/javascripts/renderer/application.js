import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane } from "react-photonkit";

ReactDom.render(
  <Window>
    <Content>
      <PaneGroup>
        <Pane className="padded-more">
          Hello, react-photonkit!!!
        </Pane>
      </PaneGroup>
    </Content>
  </Window>
  , document.querySelector("#main"));