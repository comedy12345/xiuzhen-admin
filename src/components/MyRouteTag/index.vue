<script lang="tsx">
import { defineComponent } from "vue";
import { Tag } from 'ant-design-vue';
import { useLayout } from "@/hooks/useLayout";
export default defineComponent({
      setup() {
            const { state, route, removeRouteHistory, routerLinkHander } = useLayout();
            const setTabName = (path: string, name: string) => {
                  let reg = /[\u4e00-\u9fa5]/g;
                  let names = path.match(reg);
                  if (names) {
                        const arr = path.split('/');
                        return arr[arr.length - 1];
                  };
                  return name;
            }
            return () => (
                  <div class="my-route-tag">
                        {
                              state.routeHistorys.map(item => {
                                    return (
                                          <Tag class={{ active: route.path === item.path }}
                                                closable
                                                onClose={removeRouteHistory(item.id)}
                                                key={item.id}
                                          >
                                                <span onClick={routerLinkHander(item.path)}>{setTabName(item.path, item.name)}</span>
                                          </Tag>
                                    )
                              })
                        }
                  </div>
            )
      }
})
</script>
<style lang="scss" scoped>
.my-route-tag {
      height: 30px;
      display: flex;

      .ant-tag {
            height: 26px;
            line-height: 24px;
            cursor: pointer;

      }

      .active {
            background-color: #1890FF;
            color: #fff;
            border: 1px solid #1890FF;

            :deep(svg) {
                  color: #fff;
            }
      }
}
</style>