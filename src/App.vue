
<script lang="tsx">
import { defineComponent, toRefs } from 'vue';
import { RouterView } from 'vue-router';
import { Progress } from 'ant-design-vue';
import useProgressStore from "@/store/progress";
export default defineComponent({
  setup() {
    const progressStore = useProgressStore();
    const { status, rateOrogress } = toRefs(progressStore);
    return () => (
      <div class="app">
        <>
          {status?.value && <Progress percent={rateOrogress?.value} strokeWidth={3} show-info={false} />}
          <RouterView></RouterView>
        </>
      </div >
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

.app {
  .ant-progress {
    position: absolute;
    z-index: 1;
    top: -10px;
  }
}
</style>
