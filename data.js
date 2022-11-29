const data = {
    formation: [
        {
            "name": "A",
            "id": "A",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/new-super-mario-bros-u/4/48/Yoshi.png",
            "label": "A",
            "connectionsOut": [
                "B", "C"
            ],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
        {
            "name": "F",
            "id": "F",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/new-super-mario-bros-u/4/48/Yoshi.png",
            "label": "F",
            "connectionsOut": [
                "C"
            ],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
        {
            "name": "B",
            "id": "B",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/new-super-mario-bros-u/4/48/Yoshi.png",
            "label": "B",
            "connectionsOut": [
                "C"
            ],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
        {
            "name": "C",
            "id": "C",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "./images/arrow-sink.svg",
            "label": "C",
            "connectionsOut": [
                "D"
            ],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
        {
            "name": "D",
            "id": "D",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "./images/arrow-source.svg",
            "label": "D",
            "connectionsOut": [
                "E"
            ],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
        {
            "name": "E",
            "id": "E",
            "entity": {
                "initialGraphData": true
            },
            "iconUrl": "./images/noun-up-3815871.svg",
            "label": "E",
            "connectionsOut": [],
            "updateableFields": {
                inc: 1,
                serverUtilization: 1,
                queueHistogram: {},
            }
        },
    ]
};

const dataUpdate = [
	{
		"type": "GRAPH_DATA:PROCESSING",
		"m": {  // is just m for message, probably should give it a better name, but will keep it for now
			"timeStepCount": 108,
			"id": "D",
			"rv": {
				"lambda": 0.1
			},
			"queue": {
				"size": 0
			},
			"maxQueueSize": -1,
			"opts": {
				"xx": true
			},
			"isProcessor": true,
			"concurrency": 15,
			"inputQueue": {
				"size": 2
			},
			"processingQueue": {
				"size": 1
			},
			"outQueue": {
				"size": 0
			},
			"totalServerBusyTime": 135000,
			"totalServerIdleTime": 675000,
			"processedCount": 270,
			"inputQueueHistogram": {
				"0": 44500, // the value is the amount of time spent with queue size = 0
				"4": 500,  // the value is the amount of time spent with queue size = 4
				"11": 500, // // the value is the amount of time spent with queue size = 11
				"15": 4000,
				"19": 500,
				"30": 4000
			},
			"processingQueueHistogram": {
				"0": 44500,  // the value is the amount of time spent with queue size = 0
				"4": 500,   // the value is the amount of time spent with queue size = 4
				"11": 500,
				"15": 8500  // interesting that the first 4 values mirror the input queue
			},
            "outputQueueHistogram": {
                "0": 62000,  // the value is the amount of time spent with queue size = 0
            },
            "inputQueueTimeWaiting": {
                "dist": [
                    500,
                    1000,
                    1000,
                    500,
                    2000,
                    2500,
                    1000,
                    500
                ]
            },
            "processingQueueTimeWaiting": {
                "dist": [
                    1500,
                    1000,
                    1000,
                ]
            },
            "outputQueueTimeWaiting": {
                "dist": [

                ]
            },
		},
		// NOTE: connection information is fairly static (won't change much over time as simulation proceeds)
		// *however* to represent disconnects we can dynamically route movables and "turn off" a certain destination
		// but I don't see why we would ever need to dynamically *disconnect* nodes, however: we
		// may want to dynamically *connect* one node to another....TBD
		"connectionsIn": {
			"size": 0,
			"values": []
		},
		"connectionsOut": {
			"size": 1,
			"values": [
				"A"
			]
		},
		// NOTE: movable items represents a count (group by origin) of items from a previous node
		// this is primarily for animating the graph, showing things moving from one node to another
		// this means the animation might be a half-second or full-second behind the simulation,
		// but that should be fine
		"movableItems": {
			"from": {
				"A": {
					"count": 3
				},
				"B": {
					"count": 7
				},
				"D": {
					"count": 6
				}
			}
		}
	}
];