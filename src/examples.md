# 在线代码编辑

## HTML

<HTMLMonacoEditor :id="'html-editor'" :initialValue="HTMLTestData" :initialLanguage="'html'" />

## CSS

<CSSMonacoEditor :id="'css-editor'" :initialValue="cssTestData" :initialLanguage="'css'" />

## JavaScript

<JSMonacoEditor :id="'js-editor'" :initialValue="jsTestData" :initialLanguage="'javascript'" />


<script setup>
    import { defineAsyncComponent, ref } from 'vue';
    import { inBrowser } from 'vitepress';

    const getEditor = () => {
        return inBrowser
              ? defineAsyncComponent(() => import('./components/monaco.vue'))
              : () => null;
    }
    
    // Dynamically import the MonacoEditor component if in browser
    const HTMLMonacoEditor = getEditor();
    const CSSMonacoEditor = getEditor();
    const JSMonacoEditor = getEditor();
    
    const HTMLTestData = ref(`<html>
<head>
    <title>Color Changer</title>
</head>
<body>
    <button id="changeColor">Change Background Color</button>
</body>
</html>`);


    const cssTestData = ref(`/* CSS example code */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
`);

    const jsTestData = ref(`document.getElementById('changeColor').addEventListener('click', function() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});`);

</script>
