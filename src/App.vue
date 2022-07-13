<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
export default defineComponent({
  setup() {
    return () => (
      <div class="app">
        <RouterView></RouterView>
      </div>
    )
  },
})
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif !important;
  font-size: 14px;
}
</style>
