(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(19)},16:function(e,t,a){},17:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(7),r=a.n(i),o=(a(16),a(1)),h=a(3),l=a(9),u=a(8),c=a(4),m=a(10),p=(a(17),a(2)),d=function e(t,a){Object(o.a)(this,e),this.i=t,this.j=a},f=function e(t,a){Object(o.a)(this,e),this.color=t,this.isEmpty=a},g=[{color:"blueviolet",def:[[0,1,0],[1,1,1]]},{color:"red",def:[[1,1,0],[0,1,1]]},{color:"limegreen",def:[[0,1,1],[1,1,0]]},{color:"aqua",def:[[1,1,1,1]]},{color:"goldenrod",def:[[1,1],[0,1],[0,1]]},{color:"dodgerblue",def:[[1,1],[1,0],[1,0]]},{color:"gold",def:[[1,1],[1,1]]}],v=function(){function e(t,a){Object(o.a)(this,e),this.m=t,this.n=a,this.shape=void 0,this.nextShape=void 0,this.shapePosition=void 0,this.squares=void 0,this.gameOver=!1,this.lineCount=0,this.nextShape=b.createRandom(),this.createShape(),this.initSquares()}return Object(h.a)(e,[{key:"createShape",value:function(){this.shape=this.nextShape.clone(),this.nextShape=b.createRandom(),this.shapePosition=new d(-1*this.shape.getHeight(),Math.floor((this.m-this.shape.getWidth())/2))}},{key:"initSquares",value:function(){for(var e=[],t=0;t<this.n;t++){for(var a=[],n=0;n<this.m;n++)a.push(new f("",!0));e.push(a)}this.squares=e}},{key:"getNextShape",value:function(){var e=this;return this.nextShape.getDef().map(function(t){return t.map(function(t){return new f(0===t?"":e.nextShape.color,0===t)})})}},{key:"moveShapeDown",value:function(){for(var e=this.shapePosition,t=this.shape.getDef(),a=this.shape.getWidth(),n=this.shape.getHeight(),s=Object(p.cloneDeep)(this.squares),i=n-1;i>=0;i--)for(var r=0;r<a;r++){var o=e.i+i,h=e.j+r;if(o+1>=this.n)return this.createShape(),!1;if(1===t[i][r]&&o+1>=0)if(o+1===0)s[o+1][h]=new f(this.shape.color,!1);else{if(!s[o+1][h].isEmpty)return e.i<0?this.gameOver=!0:this.createShape(),!1;s[o+1][h]=new f(s[o][h].color,s[o][h].isEmpty),s[o][h]=new f("",!0)}}return this.squares=s,this.shapePosition=new d(this.shapePosition.i+1,this.shapePosition.j),!0}},{key:"clearCompleted",value:function(){for(var e=Object(p.cloneDeep)(this.squares),t=!1,a=this.n-1;a>=0;){for(var n=!0,s=0;s<this.m;s++)n=n&&!e[a][s].isEmpty;if(n){t=!0,this.lineCount++;for(var i=a;i>=1;i--)for(var r=0;r<this.m;r++)e[i][r]=e[i-1][r]}else a--}return t&&(this.squares=e),t}},{key:"moveShapeLeft",value:function(){for(var e=this.shapePosition,t=this.shape.getDef(),a=this.shape.getWidth(),n=this.shape.getHeight(),s=Object(p.cloneDeep)(this.squares),i=n-1;i>=0;i--)for(var r=0;r<a;r++){var o=e.i+i,h=e.j+r;if(h-1<0)return!1;if(1===t[i][r]&&o>=0){if(!s[o][h-1].isEmpty)return!1;s[o][h-1]=new f(s[o][h].color,s[o][h].isEmpty),s[o][h]=new f("",!0)}}return this.squares=s,this.shapePosition=new d(this.shapePosition.i,this.shapePosition.j-1),!0}},{key:"moveShapeRight",value:function(){for(var e=this.shapePosition,t=this.shape.getDef(),a=this.shape.getWidth(),n=this.shape.getHeight(),s=Object(p.cloneDeep)(this.squares),i=n-1;i>=0;i--)for(var r=a-1;r>=0;r--){var o=e.i+i,h=e.j+r;if(h+1>=this.m)return!1;if(1===t[i][r]&&o>=0){if(!s[o][h+1].isEmpty)return!1;s[o][h+1]=new f(s[o][h].color,s[o][h].isEmpty),s[o][h]=new f("",!0)}}return this.squares=s,this.shapePosition=new d(this.shapePosition.i,this.shapePosition.j+1),!0}},{key:"rotateShape",value:function(){for(var e=this.shapePosition,t=this.shape.getDef(),a=this.shape.getWidth(),n=this.shape.getHeight(),s=this.shape.clone().rotate(),i=new d(e.i-(s.getHeight()-n),e.j+s.getWidth()>=this.m?e.j-(s.getWidth()-a):e.j),r=Object(p.cloneDeep)(this.squares),o=0;o<n;o++)for(var h=0;h<a;h++){var l=e.i+o,u=e.j+h;1===t[o][h]&&l>=0&&!r[l][u].isEmpty&&(r[l][u].isEmpty=!0,r[l][u].color="")}for(var c=0;c<s.getHeight();c++)for(var m=0;m<s.getWidth();m++){var g=i.i+c,v=i.j+m;if(1===s.getDef()[c][m]&&g>=0){if(!r[g][v].isEmpty)return!1;r[g][v]=new f(this.shape.color,!1)}}return this.shapePosition=new d(i.i,i.j),this.shape.rotate(),this.squares=r,!0}}]),e}(),b=function(){function e(t,a){var n=this;Object(o.a)(this,e),this.shape_def=t,this.color=a,this.getWidth=function(){return n.shape_def[0].length},this.getHeight=function(){return n.shape_def.length},this.getDef=function(){return n.shape_def}}return Object(h.a)(e,[{key:"clone",value:function(){return new e(this.shape_def,this.color)}},{key:"rotate",value:function(){for(var e=this.getWidth(),t=this.getHeight(),a=[],n=0;n<e;n++){for(var s=[],i=t-1;i>=0;i--)s.push(this.shape_def[i][n]);a.push(s)}return this.shape_def=a,this}}],[{key:"createRandom",value:function(){var t=g[Math.floor(Math.random()*g.length)];return new e(t.def,t.color)}}]),e}(),S=function(e){var t=["square"];return e.data.isEmpty&&t.push("empty"),s.a.createElement("div",{className:t.join(" "),style:{backgroundColor:e.data.color,borderColor:e.data.color}})},w=function(e){var t=e.squares.map(function(e,t){return s.a.createElement(s.a.Fragment,{key:t},e.map(function(e,t){return s.a.createElement(S,{key:t,data:e})}),s.a.createElement("div",{className:"clear"}))});return s.a.createElement("div",{className:"board",style:e.style},t)},y=function(e){return s.a.createElement("div",{className:"info",style:e.style},s.a.createElement("div",null,s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Next"),s.a.createElement(w,{squares:e.nextShape})),s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Actions"),s.a.createElement("p",null,s.a.createElement("button",{type:"button",onClick:e.onNewGame},"New game")),s.a.createElement("p",null,s.a.createElement("button",{type:"button",onClick:e.onPause},"Pause"))),s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Stats"),s.a.createElement("p",null,"Lines: ",s.a.createElement("span",{className:"highlight"},e.lineCount))),s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Keyboard controls"),s.a.createElement("p",null,"Left: ",s.a.createElement("span",{className:"highlight"},"Left arrow")),s.a.createElement("p",null,"Right: ",s.a.createElement("span",{className:"highlight"},"Right arrow")),s.a.createElement("p",null,"Rotate: ",s.a.createElement("span",{className:"highlight"},"Up arrow")),s.a.createElement("p",null,"Speed up: ",s.a.createElement("span",{className:"highlight"},"Down arrow")),s.a.createElement("p",null,"Pause: ",s.a.createElement("span",{className:"highlight"},"P")),s.a.createElement("p",null,"Drop: ",s.a.createElement("span",{className:"highlight"},"Space")))))},E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).board=void 0,a.timer=0,a.onTimerTick=function(){"running"===a.state.gameState&&a.moveDown()},a.handleKeyDown=function(e){if("running"===a.state.gameState||"paused"===a.state.gameState)if(32===e.keyCode){for(;a.board.moveShapeDown(););a.board.gameOver||a.board.clearCompleted(),console.log(a.board.squares),a.setState(function(e){return{squares:a.board.squares,nextShape:a.board.getNextShape(),gameState:a.board.gameOver?"gameOver":e.gameState,lineCount:a.board.lineCount}})}else 37===e.keyCode?a.board.moveShapeLeft()&&a.setState({squares:a.board.squares}):39===e.keyCode?a.board.moveShapeRight()&&a.setState({squares:a.board.squares}):38===e.keyCode?a.board.rotateShape()&&a.setState({squares:a.board.squares}):40===e.keyCode?a.moveDown():80===e.keyCode&&a.togglePause()},a.stopTimer=function(){return window.clearInterval(a.timer)},a.startTimer=function(){a.stopTimer(),a.timer=window.setInterval(a.onTimerTick.bind(Object(c.a)(a)),500)},a.getBoardWidth=function(){return 35*a.board.m},a.getBoardHeight=function(){return 35*a.board.n},a.getInfoWidth=function(){return 320},a.getGameWidth=function(){return a.getBoardWidth()+a.getInfoWidth()+10},a.board=new v(10,20),a.state={squares:a.board.squares,nextShape:a.board.getNextShape(),gameState:"new",lineCount:0},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"moveDown",value:function(){var e=this;this.board.moveShapeDown()?this.setState({squares:this.board.squares}):(this.board.clearCompleted()&&this.setState({squares:this.board.squares}),this.setState(function(t){return{nextShape:e.board.getNextShape(),gameState:e.board.gameOver?"gameOver":t.gameState,lineCount:e.board.lineCount}}))}},{key:"togglePause",value:function(){var e=this;this.setState(function(t){return"paused"===t.gameState?(e.startTimer(),{gameState:"running"}):"running"===t.gameState?(e.stopTimer(),{gameState:"paused"}):null})}},{key:"pause",value:function(e){this.togglePause(),e.target.blur()}},{key:"newGame",value:function(e){console.log("new game"),this.board=new v(10,20),this.setState({squares:this.board.squares,nextShape:this.board.getNextShape(),gameState:"running",lineCount:0}),this.startTimer(),e.target.blur()}},{key:"render",value:function(){return s.a.createElement("div",{className:"game",style:{width:this.getGameWidth()}},s.a.createElement(w,{squares:this.state.squares,style:{width:this.getBoardWidth(),float:"left"}}),s.a.createElement(y,{nextShape:this.state.nextShape,style:{width:this.getInfoWidth(),float:"left"},lineCount:this.state.lineCount,onPause:this.pause.bind(this),onNewGame:this.newGame.bind(this)}),s.a.createElement("div",{className:"clear"}))}}]),t}(n.Component);r.a.render(s.a.createElement(E,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.f24956db.chunk.js.map