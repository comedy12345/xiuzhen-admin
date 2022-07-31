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
            return () => (
                  routesMenu.value.map(item => {
                        const { path, name, children } = item;
                        if (path !== '/' && doNotShow.some(doNotShowItem => path.includes(doNotShowItem))) return;
                        if (children) {
                              return (
                                    <SubMenu title={name} key={path} icon={<alibaba-outlined />} >
                                          <MyMenuItem routesMenu={children} />
                                    </SubMenu>
                              )
                        }
                        return (
                              <MenuItem key={path} icon={<github-outlined />}>
                                    <RouterLink to={{ path: path }}>{name}</RouterLink>
                              </MenuItem>
                        )
                  })
            )
      }
})
export default MyMenuItem;
</script>