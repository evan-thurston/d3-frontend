<!-- TODOS:
(F) Feature (B) Bugfix -->
12-7-22:
F* reload node locations
B* connect arrows to triangles

<!-- COMPLETED TODOS
(F) Feature (B) Bugfix -->
12-7-22
<!-- F* save frontend locations -->
<!-- F* animate multiple objects along a link, given rate parameter -->
<!-- F* snap to grid -->


FEATURES:

TODO: this could be a mis-take, but will think about it - 
put a "spread out" button in the control panel - this will ensure that all nodes are at least x units apart from each other.
I think forces between nodes already achieve this to a degree. But I guess the spread out button will like extra special force the
spread out amount to be honored? tbd

TODO: *login with google or something* - maybe just email address - we can email results if someone checks a box or something
or maybe put the results in their google drive and send a link to that in an email. the results would always overwrite previous
unless the user specified not to. not huge on google, but I don't really want to store users in db. so I think what we need to 
do is make sure an address actually belongs to someone - that could mean "login with google" or maybe better, just click
the link to verify an email - this could put a token in the browser proving that they own the email address, and that's all
we really need to know? something to think about.

TODO: "mini map" - like an iframe of the whole page but in the corner - this might be useless except when using zoom etc.
the mini-map makes things look professional and fancy, but not super high priority.

TODO: detect when two nodes are connected bidirectionally (furthermore, in general, there could be 3 or more links between the same two nodes),
we should find a way to draw the arrows in a bendy manner so they can be distinguished visually. Will improve the description
on this one soon.

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

