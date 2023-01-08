<!-- COMPLETED TODOS
(F) Feature (B) Bugfix (M) Meta -->

12-7-23:
<!-- B* remove d3 helper fields from objectdisplay -->
<!-- F* tickerboard layout/basic css -->
<!-- M* todos cleanup -->
<!-- F* tickerboard css cleanup (no longer using objectdisplay) -->

12-5-23:
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