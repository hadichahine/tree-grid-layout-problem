# Tree-Grid Layout Problem
## Problem Definition
You're given a tree. This tree is supposed to be laid out on a grid. The grid starts at (0,0) and is infinite. The root should be laid out at (0,0). Children nodes occupy a certain space with their children. This space shouldn't be used by its siblings.
## Origin
I first crossed this problem in a form where I had to lay out a tree within a certain div. CSS Grid was the only way (and the fastest) way to ensure that any increase in the height of the nodes would push the other nodes to increase their height. The original solution wasn't as efficient. The problem is recreated here and isolated from any irrelevant details.
