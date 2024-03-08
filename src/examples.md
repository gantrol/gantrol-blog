
<MonacoEditor :initialValue="cssTestData" :initialLanguage="'css'" />

<script setup>
    import { defineAsyncComponent, ref } from 'vue';
    import { inBrowser } from 'vitepress';
    
    // Dynamically import the MonacoEditor component if in browser
    const MonacoEditor = inBrowser
      ? defineAsyncComponent(() => import('./components/monaco.vue'))
      : () => null;
    
    // Define some CSS test data as an example
    const cssTestData = ref(`/* CSS example code */
body {
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
`);
</script>
