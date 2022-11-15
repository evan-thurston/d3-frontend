(Search for "TODO" in the codebase, to find todos).


1. make initial separating force a little stronger, so that nodes are further apart (more spaced out).
2. in initial render, avoid crossing lines/edges
3. avoid crossing links - https://stackoverflow.com/questions/74453071/avoid-crossing-links
4. rendering is optimization problem, roughly:
   * minimize link crossing/overlap.
   * maximize space between nodes.
   * but keep drawing within container.
