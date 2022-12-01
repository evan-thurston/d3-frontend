All todos here:

TODO: cycle between 3 to 5 states for each node
TODO: low priority task: render objects/nodes in the midpoint of edges/links!

TODO: high priority - there needs to be 3 histograms for each node:
    1. histogram representing the input queue  (for items at node and waiting to be processed)
    2. histogram representing processing time (for items in process at node - not exactly a queue just time spent being processed)
    3. histogram representing the output queue (items at same node but waiting to leave - to be accepted by another node)
    note: these histograms should be updated node-by-node, so as not to re-render whole graph unnecessarily

<!-- DONT NEED? * TODO: 1. scale drawing to 90% of viewport (vertically and horizontally)
DONT NEED TODO: 4. allow for triangle or rectangular shapes in nodes
DONT KNOW TODO: 8. change forces so the more force between nodes given more degrees of separation/freedom

DONE TODO: 2. add permanent labels to nodes
DONE TODO: 3. add permanent icons to nodes (any image url is fine for now)
DONE ** TODO: 10: on-click node -> show histogram
DONE ** TODO: 11: code histogram into metadata toggle
DONE ** TODO: 5. add on-hover text (show metadata when hovering over)
DONE TODO: 9. allow user to toggle on/off nodes self-separating - default is on - if it's off: then user can drag nodes wherever they want 
DONE ** TODO: 11: on-hover over link -> show histogram
DONE TODO:make initial separating force a little stronger, so that nodes are further apart (more spaced out).
DONE * TODO: 15: nodes will "float" outside of viewport, after turning physics on/off -->

TODO: 6. add dynamic text above node (gets updated constantly from backend)
TODO: 7. add dynamic images/drawings/animation along links (gets updated constantly from backend)
* TODO: 12: create a control panel that can do the following:
   <!-- * button to toggle physics on/off for the graph -->
   * pause/unpause button (to pause a process on backend
   * button to slow-down or speed-up backend process (change timestep)
   * button to stop all sources (stop generating new consumables/movables on the backend)
TODO: 13: control panel at top: movable
<!-- TODO: 14: create generic JSON editor panel - show JSON blob and allow user to edit and save it (there should be ready-made solutions for this) -->
TODO: 16: need to find a way to do an ultra-efficient re-render of each node -
          only render changed nodes and do *not* re-render whole damn thing!
<!-- TODO: 17: fix viewport too tall(no scrolling !) -->

<!-- TODO:2. on/in initial render, avoid crossing lines/edges -->
* TODO: 3. avoid crossing links - https://stackoverflow.com/questions/74453071/avoid-crossing-links
TODO: 4. rendering is optimization problem, roughly:
      * minimize link crossing/overlap.
      * maximize space between nodes.
      * but keep drawing within container.
TODO: find a way to efficiently re-render graph nodes/links without re-rendering whole graph:  
      see this SO question: https://stackoverflow.com/questions/74486923/re-render-nodes-efficiently-in-d3-force-directed-graph
   TODO: re-render nodes by id (efficiently, only 1 node at a time)

<!-- evan todos -->

BUGFIXES:
* NetworkGraph foreignobject popup hidden behind nodes (z index doesnt fix this)
    this problem is pretty difficult because svg paints elements in the order they appear in the dom
    if we want to use svelte to draw these popups in the dom, i dont know how to fix drawing order
    only solution i see is drawing the foreignobject in d3 after the nodes are drawn
    i'd like to search for a solution that avoids this, as it makes the code unnecessarily complicated
* NetworkGraph line 79 zoom doesnt work w metadata
* NetworkGraph line 94 links dont display arrows
* +page.svelte line 53 edit dataset with JSON editor