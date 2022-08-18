<!--
 * @Description: 文件描述
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-08-18 09:56:11
-->
<script lang="tsx">
import { defineComponent, PropType, toRefs } from "vue";
import { MenuItem, SubMenu } from 'ant-design-vue';
import { RouteRecordRaw, RouterLink } from "vue-router";
import { doNotShow } from "@/config/routeExclusion";
const MyMenuItem = defineComponent({
      props: {
            routesMenu: {
                  type: Array as PropType<RouteRecordRaw[]>,
                  default: () => []
            }
      },
      setup(props) {
            const { routesMenu } = toRefs(props);
            const routeIsIcon = {
                  'dashboard-two-tone': <dashboard-two-tone />,
                  'user-outlined': <user-outlined />,
                  'team-outlined': <team-outlined />,
                  'cluster-outlined': <cluster-outlined />,
                  'bulb-outlined': <bulb-outlined />,
            }

            return () => (
                  routesMenu.value.map(item => {
                        const { path, name, children, meta } = item;
                        const icon: string | any = meta?.icon;
                        if (path !== '/' && doNotShow.some(doNotShowItem => path.includes(doNotShowItem))) return;
                        if (children) {
                              return (
                                    <SubMenu title={name} key={path} icon={routeIsIcon[icon]} >
                                          <MyMenuItem routesMenu={children} />
                                    </SubMenu>
                              )
                        }
                        return (
                              <MenuItem key={path} icon={routeIsIcon[icon]}>
                                    <RouterLink to={{ path: path }}>{name}</RouterLink>
                              </MenuItem>
                        )
                  })
            )
      }
})
export default MyMenuItem;
</script>