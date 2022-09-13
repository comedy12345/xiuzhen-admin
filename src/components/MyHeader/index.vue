<!--
 * @Description: 系统头部组件
 * @Author: ljf
 * @Date: 2022-07-13 17:07:44
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-13 17:08:22
-->
<script lang="tsx">
import { defineComponent, ref } from "vue";

import MyBreadcrumb from "@/components/MyBreadcrumb/index.vue";
import MyRouteTag from "@/components/MyRouteTag/index.vue";
import useUpdPwdHook from "./updPwdHook";


export default defineComponent({
      setup() {
            const { $state, visible, pwdForm, rules, updPwdSave, handleUpdPwd } = useUpdPwdHook();
            const UpdPwdBox = () => {
                  return (
                        <a-modal v-model:visible={visible.value} title="修改密码" onOk={updPwdSave}>
                              <a-form labelCol={{ style: { width: '100px' } }} model={pwdForm.value} rules={rules}>
                                    <a-form-item label="当前密码" name='wornPasswd'>
                                          <a-input type="password" v-model:value={pwdForm.value.wornPasswd} />
                                    </a-form-item>
                                    <a-form-item label="修改的密码" name='passwd'>
                                          <a-input type="password" v-model:value={pwdForm.value.passwd} />
                                    </a-form-item>
                                    <a-form-item label="再次确认密码" name='qrPwd'>
                                          <a-input type="password" v-model:value={pwdForm.value.qrPwd} />
                                    </a-form-item>
                              </a-form>
                        </a-modal>
                  )
            }
            return () => (
                  <div class="my-header">
                        <div class='router-history'>
                              <div>
                                    <MyBreadcrumb />
                                    <MyRouteTag />
                              </div>
                              <div>
                                    <a-dropdown>
                                          {{
                                                default: () => {
                                                      return (
                                                            <a-space>
                                                                  <span>{$state.userName}</span>
                                                                  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                            </a-space>
                                                      )
                                                },
                                                overlay: () => {
                                                      return (
                                                            <a-menu>
                                                                  <a-menu-item key="1" onClick={handleUpdPwd}>
                                                                        修改密码
                                                                  </a-menu-item>
                                                                  <a-menu-item key="2" >
                                                                        退出登录
                                                                  </a-menu-item>
                                                            </a-menu>
                                                      )
                                                }
                                          }}
                                    </a-dropdown>
                              </div>

                        </div>
                        {UpdPwdBox()}
                  </div >
            )
      }
})
</script>
<style lang="scss" scoped>
.my-header {
      .router-history {
            display: flex;
            justify-content: space-between;
            align-items: center;


      }
}
</style>
