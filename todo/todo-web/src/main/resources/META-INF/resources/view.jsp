<%@ include file="/init.jsp" %>

<!-- Location of javascript file loaded into Portal -->
<script src="/o/todo-app-webpack-1.0.0/js/dist/bundle.js"></script>


<!-- React App Portion -->

<div id="todoAppWebpack"></div>

<aui:script>
	window.App(document.getElementById('todoAppWebpack'));
</aui:script>
