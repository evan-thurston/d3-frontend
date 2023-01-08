
Note: A "stationary entity" is a node on the front-end, whereas a "movable entity" is something that goes across links between
nodes.

TODO: allow read from Excel/Google Sheets/Airtable, for user to setup simulation etc.

TODO: find a software pattern for declaring node with 1-in, 2-outs, where the 2-outs are visiting with probability
(p) and (1-p), this info should be declared in the node, not links, most likely. Likewise, for 3-outs, 4-outs, etc.

TODO: find a pattern to run and display genetic/evolutionary algorithms. Every child/mutation will probably be modeled by a 
"movable" in the backend, and the stationary components will probably be more abstract - but a tickerboard/timeline
showing each event/mutation, would be a value-add on the front-end. For now, I think you have 4 nodes,
a birth node (source), a death node (sink), and 2 processor nodes, which are the 2 parents of every child/mutation, where
those children are movables.

TODO: create a "timeline panel" that is basically like a ticker-board, a new event is posted and the panel scrolls down.
So every time a new line is written to the timeline, it scrolls down a line.

//TODO: nodes repel every other node, but subject to inverse-squared or inverse-cubed law
// the above might result in "triangles instead of squares", but we might be able to use dummy nodes to combat that
// use-case, want to arrange nodes onto an even grid, like a grid of city streets etc.

TODO: Use dummy nodes for layout purposes:
Eventually we want some grid systems, like streets/intersections or a factory layout..your solution to snap to grid 
will definitely help and play a part. one additional idea is to use dummy (invisible) nodes that attract/repel a group 
together around a center point. I attached a picture, the green are real nodes, the black are dummy/invisible nodes 
that just are for layout purposes. Each black node is only attached to the 4 local nodes.
So with the example above in mind, we need to make these dummy nodes and dummy links invisible, which is just a boolean
stored on each link and node. (We could also use dummy nodes on the exterior of shapes to pull outwards).

TODO: process backend-event-queue on the front-end - basically, the front-end should consume these events at a rate
of ~1/10th of a second. The back-end will spit events up to the front-end at about 1/10th of a second (the same rate).
Front-end should read from a queue, instead of reading directly from websocket. Websocket puts events on that queue.
We can create a system
of backpressure where if the front-end is bogged down, we can wait to send more events to front-end. If the back-end is generating
a lot more events than front-end can consume, we may need to use disk to store events before they go to front-end, which would be fine.
In general, I think we should stick to 1/10th of a second on front-end, so that most updates aren't any more frequent than that,
so that rendering doesn't often get behind events. 


FEATURES:

//TODO: multiple modals for multiple selected nodes:
select a node with control+click (or shift+click, whatever works), we can select multiple nodes, and then multiple modals would show up.
multiple open modals and the control panel need to co-exist somehow

TODO: this could be a mis-take, but will think about it - 
put a "spread out" button in the control panel - this will ensure that all nodes are at least x units apart from each other.
I think forces between nodes already achieve this to a degree. But I guess the spread out button will like extra special force the
spread out amount to be honored? tbd

TODO: Make a PWA for desktop and mobile

TODO: "mini map" - like an iframe of the whole page but in the corner - this might be useless except when using zoom etc.
the mini-map makes things look professional and fancy, but not super high priority.

TODO: 8. change forces so there's more force between nodes given more degrees of separation/freedom
TODO: 16: need to find a way to do an ultra-efficient re-render of each node -
    only render changed nodes and do *not* re-render whole damn thing!
* TODO: 3. avoid crossing links - https://stackoverflow.com/questions/74453071/avoid-crossing-links

TODO: 4. rendering is optimization problem, roughly:
    * minimize link crossing/overlap.
    * maximize space between nodes.
    * but keep drawing within container.

TODO: find a way to efficiently re-render graph nodes/links without re-rendering whole graph:  
    see this SO question: https://stackoverflow.com/questions/74486923/re-render-nodes-efficiently-in-d3-force-directed-graph
TODO: re-render nodes by id (efficiently, only 1 node at a time)

B* impossible w/o svg2? NetworkGraph line 212 arrowhead doesn't change color w/ links
B* improve forces calculation 
    * create manybody force on links?
    * create more force based on number of links indirectly targeting(but make it fast !)

Put finished TODOS below here!:

<!-- ////// FEATURES ////// -->
<!-- DONE * JSON edit doesn't reflect in visualization -->
<!-- DONE TODO: low priority task: render objects/nodes in the midpoint of edges/links! -->
<!-- DONE * Loading screen while waiting for data/d3 -->
<!-- DONE * TODO: 12: create a control panel that can do the following: -->
   <!-- * button to toggle physics on/off for the graph -->
   <!-- * pause/unpause button (to pause a process on backend -->
   <!-- * button to slow-down or speed-up backend process (change timestep) -->
   <!-- * button to stop all sources (stop generating new consumables/movables on the backend) -->
<!-- DONE TODO: 7. add dynamic images/drawings/animation along links (gets updated constantly from backend) -->
<!-- DONE TODO 0: create functionality and code quality to dynamically add/remove both nodes and links.
    We can use the JSON editor panel thing to do these updates/deletes of nodes/links.
    Creating/declaring a new node I guess should be as easy as creating a new element in the array in the JSON, likewise for links. -->
<!-- DONE TODO: The 6 histograms should have titles: 
    By Queue Length
    1. Input Queue 2. Processing Queue. 3. Output Queue

    By Time in Queue
    1. Input Queue 2. Processing Queue. 3. Output Queue -->
<!-- DONE TODO: cycle between 3 to 5 states for each node -->
<!-- MOCKUP DONE TODO: high priority - there needs to be 3 histograms for each node:
    1. histogram representing the input queue  (for items at node and waiting to be processed)
    2. histogram representing processing time (for items in process at node - not exactly a queue just time spent being processed)
    3. histogram representing the output queue (items at same node but waiting to leave - to be accepted by another node)
    note: these histograms should be updated node-by-node, so as not to re-render whole graph unnecessarily -->
<!-- DONE * TODO: 1. scale drawing to 90% of viewport (vertically and horizontally) -->
<!-- DONE TODO: because we may have 5-8 different "views per node", we need a way to select the current view besides "click-through",
    perhaps a drop-down menu? clicking through should still work, but the drop down can get us to desired view faster?
    Doesn't have to be a drop down, but some way to get to the right view. -->
<!-- DONE TODO: 2. add permanent labels to nodes -->
<!-- DONE TODO: 3. add permanent icons to nodes (any image url is fine for now) -->
<!-- DONE ** TODO: 10: on-click node -> show histogram -->
<!-- DONE ** TODO: 11: code histogram into metadata toggle -->
<!-- DONE ** TODO: 5. add on-hover text (show metadata when hovering over) -->
<!-- DONE TODO: 9. allow user to toggle on/off nodes self-separating - default is on - if it's off: then user can drag nodes wherever they want  -->
<!-- DONE ** TODO: 11: on-hover over link -> show histogram -->
<!-- DONE TODO:make initial separating force a little stronger, so that nodes are further apart (more spaced out). -->
<!-- DONE * TODO: 15: nodes will "float" outside of viewport, after turning physics on/off -->
<!-- DONE TODO: 17: fix viewport too tall(no scrolling !) -->
<!-- DONE TODO:2. on/in initial render, avoid crossing lines/edges -->
<!-- DONE TODO: 13: control panel at top: movable -->
<!-- DONE TODO: 14: create generic JSON editor panel - show JSON blob and allow user to edit and save it (there should be ready-made solutions for this) -->
<!-- ====================== -->
<!-- DONE TODO: Every node should have permanently visible info:
    [
        {label: "<string>", value: <any>},
        {label: "<string>", value: <any>},
        {label: "<string>", value: <any>},
        {label: "<string>", value: <any>},
        // ...
        {label: "<string>", value: <any>}
    ]
    probably only allow like 3-4 fields to be permanently visible on a node -->
<!-- ====================== -->
<!-- DONE TODO: aside from the permanently visible data, create a panel in the node view that can take data like this:
[
 {label: "<string>", value: <any>},
 {label: "<string>", value: <any>},
 {label: "<string>", value: <any>},
 {label: "<string>", value: <any>},
  // ...
 {label: "<string>", value: <any>}
]
if value is string, make the value field green, if number, orange, if boolean blue, something like that -->
<!-- ==================== -->
<!-- TODO: Active/inactive links
if link is active, make it blue/green, if link is inactive, change the or icon? -->
<!-- ======================== -->
<!-- TODO: 4. allow for triangle or rectangular shapes in nodes -->
<!-- DONE * Histogram line 36 histogram smoothing algorithm -->
<!-- TODO: 6. add dynamic text above node (gets updated constantly from backend) -->


<!-- ////// BUGFIXES: ////// -->
<!-- DONE update nodes dont scale w/ zoom (temp fix: disappear on zoom) -->
<!-- DONE * NetworkGraph line 94 links dont display arrows -->
<!-- DONE * NetworkGraph foreignobject popup hidden behind nodes (z index doesnt fix this)
    this problem is pretty difficult because svg paints elements in the order they appear in the dom
    if we want to use svelte to draw these popups in the dom, i dont know how to fix drawing order
    only solution i see is drawing the foreignobject in d3 after the nodes are drawn
    i'd like to search for a solution that avoids this, as it makes the code unnecessarily complicated -->
<!-- DONE * transform translate console error -->
<!-- DONE * +page.svelte line 53 edit dataset with JSON editor -->
<!-- DONE * NetworkGraph line 79 zoom doesnt work w metadata -->
<!-- DONE * NetworkGraph line 209 update nodes still exist while paused -->
<!-- DONE * control panel loses width on window resize -->

