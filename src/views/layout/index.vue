
<script lang="tsx">
import { defineComponent, ref, provide, KeepAlive, toRefs } from "vue";
import { RouterView, useRoute } from "vue-router";
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Menu } from 'ant-design-vue';
import MyMenuItem from '@/components/MenuItem/index.vue';
import { routes } from '@/route';
import MyHeader from "@/components/MyHeader/index.vue";
import { Key } from "ant-design-vue/lib/vc-table/interface";
import { useRouteHistoryStore } from "@/store/routeHistory";


export default defineComponent({
      setup() {
            const collapsed = ref<boolean>(false);
            const route = useRoute();
            provide('collapsed', collapsed);
            const { $state, editSelectdOpenKeys } = useRouteHistoryStore();
            const { routeHistorys, selectdOpenKeys } = toRefs($state);
            return () => (
                  <Layout hasSider={true}>
                        <LayoutSider theme='dark' collapsible={true} trigger={null} collapsed={collapsed.value}>
                              <div class="sider-header">
                                    <img src='https://www.surely.cool/surely-vue-logo.png' />
                                    {collapsed.value || <span>修真游戏管理系统</span>}
                              </div>
                              <Menu mode="inline" theme='dark'
                                    selectedKeys={[route.path]} openKeys={selectdOpenKeys.value}
                                    onOpenChange={(openKeys: Key[]) => editSelectdOpenKeys(openKeys, "upd")}>
                                    <MyMenuItem routesMenu={routes[0].children} />
                              </Menu>
                        </LayoutSider>
                        <LayoutContent class="layout-content">
                              <LayoutHeader class='layout-header' >
                                    <MyHeader />
                              </LayoutHeader>
                              <div class="layout-content-main">
                                    <RouterView>
                                          {{
                                                default: ({ Component }: { Component: any }) => {
                                                      return (
                                                            <KeepAlive include={routeHistorys.value.map(item => item.path)}>
                                                                  <Component />
                                                            </KeepAlive>
                                                      )
                                                }
                                          }}
                                    </RouterView>
                              </div>
                        </LayoutContent>
                  </Layout>
            )
      }
})
</script>

<style lang="scss" scoped>
.ant-layout {
      height: 100vh !important;

      .sider-header {
            text-align: center;
            height: 60px;
            line-height: 60px;
            color: rgb(255, 255, 255);
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                  width: 18px;
                  height: 18px;
                  margin-right: 10px;
            }
      }

      .layout-content {
            .layout-header {
                  height: 80px;
                  background-color: rgb(255, 255, 255);
                  padding: 0 20px;
                  display: flex;
                  flex-direction: column;
                  line-height: normal;
                  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.637);
            }

            .layout-content-main {
                  background-color: rgba(255, 255, 255, 0.24);
                  height: calc(100vh - 80px);
                  overflow-y: scroll;
                  padding: 20px;

                  :deep(.ant-table-wrapper) {

                        .ant-table-thead {
                              th {
                                    font-weight: bold;
                                    font-size: 16px;
                              }
                        }

                  }
            }

      }
}
</style>