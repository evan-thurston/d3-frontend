const client = new WebSocket('ws://0.0.0.0:5900');

client.addEventListener('message', m => {
    console.log('change event:', m);
    location.reload(); // reload page
});

client.addEventListener('error', e => {
    console.log(e); // we don't want any unnecessary red crap in the browser console
    console.log('start the ws-server using live-reload.js in the project root to get live updates.')
});

const width = window.innerWidth;
const height = window.innerHeight;
const minRadius = 20;
// I just made up a formula, but radius should be a function of window size
// (and eventually number of nodes as well)
const nodeRadius = Math.max(minRadius, Math.floor(Math.min(width, height) / 25));

const displayStates = ["Empty", "InputQueue", "ProcessingQueue", "OutputQueue"]

const createGraph = function(svg, nodes, links, dragStart, drag, dragEnd) {
    // Create an arrowhead.
    svg.append("defs").selectAll("marker")
        .data(["dominating"])
        .enter()
        .append("marker")
            .attr("id", d => d)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 0)
            .attr("refY", 0)
            .attr("markerWidth", 12)
            .attr("markerHeight", 12)
            .attr("orient", "auto")
            .append("path")
                .attr("d", "M0,-5L10,0L0,5");

    // Add lines representing links.
	svg.selectAll("line")
		.data(links)
		.enter()
		.append("line")
			.attr("stroke", "black")
			.attr("stroke-width", 1)
			// add marker to line
			.attr("marker-end", d => "url(#dominating)");

	// Add groups representing nodes.
	let nodeGroups = svg.selectAll("g.gnode")
		.data(nodes, d => d.id)
		.enter()
		.append("g")
		.attr("class", "gnode");

	// Add circle to each node group.
	nodeGroups.append("circle")
		.attr("r", d => d.size)
		.attr("fill", d => d.color)
		.attr("img", d => d.icon)
		.call(
			d3
				.drag()
				.on("start", dragStart)
				.on("drag", drag)
				.on("end", dragEnd)
		)
        .on("click", function(e, d) {
            console.log("Clicked " + d.id)
        });

	// Add an image to each node group.
	nodeGroups.append("image")
		.attr("x", d => -d.size)
		.attr("y", d => -1.8 * d.size)
		.attr("width", d => d.size / 2)
		.attr("height", d => d.size / 2)
		.attr("href", d => d.iconUrl);

	// Add text to each node group.
	nodeGroups.append("text")
		.attr("x", d => d.size / 3)
		.attr("y", d => -1.5 * d.size)
		.attr("text-anchor", "middle")
		.text(d => 'Name: ' + d.name);

    nodeGroups.append()
};

const placeLabelsAndIcons = () => {

    // note this functionality updates all nodes/links
    // we want a way to update one-at-a-time for efficiency's sake

    const svg = d3.select("svg");

    if (!svg) {
        console.error('missing svg element.');
        return;
    }

    svg.selectAll("text").remove();
    svg.selectAll("image").remove();
    svg.selectAll("foreignObject").remove();

    const gs = svg.selectAll("g")
        .on('click', e => {
            //TODO: kind of a kludge here, there must be a way to access it cleaner?
            e.target.__data__.histogramShowing = !e.target.__data__.histogramShowing;
            if (e.target.__data__.histogramShowing) {
                e.target.parentElement.classList.add('show-histogram');
            } else {
                e.target.parentElement.classList.remove("show-histogram");
            }
        });

    // svg.selectAll("g").on("click", d => { console.log("Clicked " + d.histogramShowing); });

    let divs = gs.append("foreignObject")
        .attr("x", d => d.x - 70)
        .attr("y", d => d.y + 1.1 * d.size)
        .style("overflow", "visible")
        .append("xhtml:div")
        .text(d => d.histogramShowing ? "histogram" : [
            'Updates:', JSON.stringify(d.updateableFields),
            "\nID: ", d.id,
            "\nName:", d.name,
            '\nLabel:', d.label
        ].join(' '));

    for (const div of divs._groups[0]) {
        div.appendChild(getAndCacheHistogram(div.id));
    }
};

const histoCache = {};  // we can use a Set/Map if we want to get a fancy
const addToHistoCache = (id, value) => {
    histoCache[id] = value;
    return true;
};
const getHistoData = (id) => {
    return [{val: 9.5}, {val: 2}, {val: 2.5}, {val: 3}, {val: 3.3},
        {val: 4}, {val: 5.6}, {val: 2.1}, {val: 1.7}, {val: 7}];
};
const getAndCacheHistogram = (id) => {
    addToHistoCache(id, createHistogram(id));
    return histoCache[id];
};

// Creating a basic histogram: https://d3-graph-gallery.com/graph/histogram_basic.html
const createHistogram = (id) => {
    const data = getHistoData(id);

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 10, bottom: 10, left: 0},
        width = 120 - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

    let histSvg = d3.select("div#secret")
        .append("svg")
        .attr("class", "histogram")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    histSvg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // And apply this function to data to get the bins
    const x = d3.scaleLinear()
        .domain([0, 10])     // can use this instead of 10 to have the max of data: d3.max(data, function(d) { return +d.value })
        .range([0, width]);
    histSvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function (d) {
            return d.val;
        })
        .domain(x.domain())
        .thresholds(x.ticks(10)); // number of bins

    const bins = histogram(data);

    // Y axis: scale and draw:
    const y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function (d) {
        return d.length;
    })]);
    histSvg.append("g")
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    histSvg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) {
            return Math.max(0, x(d.x1) - x(d.x0) - 1);
        })
        .attr("height", function (d) {
            return height - y(d.length);
        })
        .style("fill", "#69b3a2");

    return histSvg.node();
};

const run = (nodes, links) => {
    const svg = d3.select('div#container')
        .append('svg')
        .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)

    document.turnOffPhysics = () => {
        simulation.stop();
        simulation
            .force("center", null)
            .force("nodes", null)
            .force("radial", null)
            .force("charge", null)
            .force("collision", null)
            .force("links", null);
    };

    document.turnOnPhysics = () => {
        startSimulation();
    };

    document.startSim = () => {
        client.send({startSim: true});
    };

    document.stopSim = () => {
        client.send({stopSim: true});
    };

    document.pauseSim = () => {
        client.send({pauseSim: true});
    };

    document.restartSim = () => {
        client.send({restartSim: true});
    };

    const startSimulation = () => {
        simulation
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("nodes", d3.forceManyBody())
            .force("radial", d3.forceRadial(Math.min(height, width) * 0.35, width / 2, height / 2))
            .force("charge", d3.forceManyBody().strength(-30 * nodeRadius))
            .force("collision", d3.forceCollide().radius(nodeRadius / 2))
            .force(
                "links",
                d3
                    .forceLink(links)
                    .id(d => d.id)
                    // TODO idea - force should increase as degree of freedom between nodes increases
                    .distance((d, a, b) => {
                        // QUESTION: What does this do? seems buggy in my testing
                        // answer -> after turning off/on physics this keeps the nodes separated
                        // return 0.5 * Math.sqrt(
                        //     Math.pow(d.source.x - d.target.x, 2) + Math.pow(d.source.y - d.target.y, 2)
                        // ); 
                        return 3 * (d.source.size + d.target.size)
                    })
            )
            .on("tick", ticked);
    }

    createGraph(svg, nodes, links, dragStart, drag, dragEnd);
    let simulation = d3.forceSimulation(nodes);
    startSimulation();

    function ticked() {
        var nodeGroups = svg.selectAll("g.gnode");
        var linkSelection = svg.selectAll("line");

        nodeGroups
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")";
            });

        linkSelection
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // recalculate and back off the distance
        linkSelection.each(function (d, i, n) {
            // current path length
            const pl = this.getTotalLength();
            // radius of marker head plus def constant
            const mrs = (d.source.size);
            const mrt = (d.target.size) + 12;
            // get new start and end points
            const m1 = this.getPointAtLength(mrs);
            const m2 = this.getPointAtLength(pl - mrt);
            // new line start and end
            d3.select(n[i])
                .attr("x1", m1.x)
                .attr("y1", m1.y)
                .attr("x2", m2.x)
                .attr("y2", m2.y);
        });
    }

    function dragStart(d) {
        simulation.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function drag(event, d) {
        //prevents node from exceeding horizontal bound
        if (event.x > width - nodeRadius) {
            d.fx = width - nodeRadius
        } else if (event.x < nodeRadius) {
            d.fx = nodeRadius
        } else {
            d.fx = event.x
        }

        //prevents node from exceeding vertical bound
        if (event.y > height - nodeRadius) {
            d.fy = height - nodeRadius;
        } else if (event.y < nodeRadius) {
            d.fy = nodeRadius;
        } else {
            d.fy = event.y;
        }
    }

    function dragEnd(d) {
        simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

const nodes = new Map();
const links = new Map();
const linksBySource = new Map();
const linksByTarget = new Map();

if (data.formation) {
    let colorIndex = 0;
    colors = d3["schemeSet1"]
    for (const z of data.formation) {
        // TODO: are there are any pre-ordained fields for rendering images or labels in nodes?
        nodes.set(z.id, {
            color: colors[colorIndex++ % colors.length],
            size: nodeRadius,
            label: z.label,
            name: z.name,
            id: z.id,
            iconUrl: z.iconUrl,
            displayState: displayStates[0],
            updateableFields: z.updateableFields
        });

        // note: in order to complete graph, we only need-be concerned with connectionsOut, not connectionsIn
        for (const targetId of z.connectionsOut) {
            // TODO: are there are any pre-built fields for rendering images or labels in links?
            const linkValue = {source: z.id, target: targetId, ...{whatever: 'else'}};
            links.set([z.id, targetId].join('-'), linkValue);
            linksBySource.set(z.id, linkValue);
            linksByTarget.set(targetId, linkValue);
        }
    }

    run(
        Array.from(nodes.values()),
        Array.from(links.values())
    );
}