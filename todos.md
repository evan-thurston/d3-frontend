<!-- FOR DOCUMENTATION PURPOSES ONLY -->
<!-- TODOS & CHANGELOG HAVE BEEN MOVED TO GITHUB PAGES -->
<!-- PLEASE DO NOT UPDATE/EDIT THIS DOCUMENT -->

Note: A "stationary entity" is a node on the front-end, whereas a "movable entity" is something that goes across links between
nodes.

TODO: find a pattern to run and display genetic/evolutionary algorithms. Every child/mutation will probably be modeled by a 
"movable" in the backend, and the stationary components will probably be more abstract - but a tickerboard/timeline
showing each event/mutation, would be a value-add on the front-end. For now, I think you have 4 nodes,
a birth node (source), a death node (sink), and 2 processor nodes, which are the 2 parents of every child/mutation, where
those children are movables.

TODO: nodes repel every other node, but subject to inverse-squared or inverse-cubed law
  the above might result in "triangles instead of squares", but we might be able to use dummy nodes to combat that
  use-case, want to arrange nodes onto an even grid, like a grid of city streets etc.
(evan: i think we're already doing this)

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

TODO: this could be a mis-take, but will think about it - 
put a "spread out" button in the control panel - this will ensure that all nodes are at least x units apart from each other.
I think forces between nodes already achieve this to a degree. But I guess the spread out button will like extra special force the
spread out amount to be honored? tbd

TODO: 16: need to find a way to do an ultra-efficient re-render of each node -
    only render changed nodes and do *not* re-render whole damn thing!
TODO: re-render nodes by id (efficiently, only 1 node at a time)
TODO: find a way to efficiently re-render graph nodes/links without re-rendering whole graph:  
    see this SO question: https://stackoverflow.com/questions/74486923/re-render-nodes-efficiently-in-d3-force-directed-graph
(evan: i think this is impossible? finding trouble updating any data w/o restarting simulation... essentially a full rerender is necessary to keep forces active)

TODO: 3. avoid crossing links - https://stackoverflow.com/questions/74453071/avoid-crossing-links

TODO: 4. rendering is optimization problem, roughly:
    * minimize link crossing/overlap.
    * maximize space between nodes.
    * but keep drawing within container.