<!-- FOR DOCUMENTATION PURPOSES ONLY -->
<!-- TODOS & CHANGELOG HAVE BEEN MOVED TO GITHUB PAGES -->
<!-- PLEASE DO NOT UPDATE/EDIT THIS DOCUMENT -->

<!-- COMPLETED TODOS
(F) Feature (B) Bugfix (M) Meta (V) Visual -->

1-10-23:
<!-- F* helper class to highlight datatype -->
<!-- F* move floating data info from nodes to metadata panel -->
<!-- F* highlight data in tickerboard -->

1-9-23:
<!-- V* tickerboard visual updates -->
<!-- V* tickerboard responsiveness -->

1-8-23:
<!-- B* overflow ticker content into an ellipsis & hover popup -->
<!-- F* sticky ticker's key to the top of the tickerboard -->
<!-- B* when swapping data, ticker tries to keep previous dataset in memory -->
<!-- V* visual changes to nodes -->
<!-- F* delete node by id -->
<!-- B* fix datanode path -->
<!-- F* improve link path calculation & marker -->
<!-- F* delete node from tickerboard -->
<!-- F* delete node from modal -->
<!-- B* fix bidirectional arrow angle -->
<!-- F* tickerboard pause function -->
<!-- F* close tickerboard from panel -->
<!-- B* curved datanode movement doesn't scale w/ zoom & lags program -->
<!-- B* connect arrows to triangles -->
<!-- F* reload node locations -->

1-7-23:
<!-- B* remove d3 helper fields from objectdisplay -->
<!-- F* tickerboard layout/basic css -->
<!-- M* todos cleanup -->
<!-- F* tickerboard css cleanup (no longer using objectdisplay) -->

1-5-23:
<!-- F* add field selection to objectdisplay component -->
<!-- F* tickerboard refactor -->

12-30-22:
<!-- F* simplify force calculation -->
<!-- B* use proper force constant on first load -->
<!-- F* tickerboard basic implementation -->
<!-- B* remove svg files -->

12-29-22:
<!-- B* fix runtime error(repair object structure) -->
<!-- F* refactor save/reset buttons(save data) -->

12-28-22:
<!-- B* connect to data array, rather than Object map -->
<!-- F* persist node locations to dataset -->

12-20-22:
<!-- F* migrate to sveltekit 1.0 and update other dependencies(run an npm install !) -->

12-13-22:
<!-- F* canvas vs svg ?? answer: svg(canvas looks bad) -->
<!-- F* new color scale -->
<!-- B* redirect account page on logout -->

12-12-22:
<!-- B* control panel smaller on laptop, collapse to corner -->
<!-- F* simplify gridline calculations -->
<!-- F* move login notifications to toast -->
<!-- F* lightmode/darkmode -->
<!-- B* metadatapanel doesnt display after closing modal -->
<!-- F* dynamically set grid increment -->
<!-- B* grid visual bugfix(link to top left corner of screen) -->

12-11-22:
<!-- B* hotfix supabase env loading -->
<!-- F* move login to navbar? -->

12-10-22:
<!-- F* organize components by folder (src/lib) -->
<!-- F* skeleton supabase functions -->
<!-- B* fix console errors -->
<!-- F* build sign in page -->
<!-- F* build manage account page -->
<!-- F* build out /auth route -->
<!-- F* supabase auth -->
<!-- F* build navbar -->
<!-- TODO: *login with google or something* - maybe just email address - we can email results if someone checks a box or something
or maybe put the results in their google drive and send a link to that in an email. the results would always overwrite previous
unless the user specified not to. not huge on google, but I don't really want to store users in db. so I think what we need to 
do is make sure an address actually belongs to someone - that could mean "login with google" or maybe better, just click
the link to verify an email - this could put a token in the browser proving that they own the email address, and that's all
we really need to know? something to think about. -->

12-9-22:
<!-- F* pause node's data in modal -->
<!-- //TODO: control panel / modals
    On modals there is a pause button that acts as a "soft-stop" it just stops the modal from having updated data,
    but the simulation keeps running. However, on the control panel, the pause button represents are "hard-stop", which
    actually stops the simulation completely (read about SIGSTOP/SIGCONT signals on Linux/Mac which completely pauses a process). -->
<!-- F* bendy arrows, repel links? -->
<!-- B* data nodes dont follow curvy path -->
<!-- B* hard to grab nodes w/ grid enabled -->
<!-- F* bidirectional node detection -->
<!-- TODO: detect when two nodes are connected bidirectionally (furthermore, in general, there could be 3 or more links between the same two nodes),
    we should find a way to draw the arrows in a bendy manner so they can be distinguished visually. Will improve the description
    on this one soon.  -->

12-8-22:
<!-- F* componentize svgs -->
<!-- F* grid lines on svg -->
<!-- F* organize control panel, network graph, related into separate components -->
<!-- B* iterable object display in modal -->
<!-- F* collapsible control panel -->
<!-- F* close modal on laptop screens -->
<!-- F* datanodes move faster w/ higher rate parameter -->

12-7-22:
<!-- F* save frontend locations -->
<!-- F* animate multiple objects along a link, given rate parameter -->
<!-- F* snap to grid -->

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
