<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

const UserStore = useUserStore()
const router = useRouter()
const confirm = () => {
  //  1.清除用户信息
  UserStore.clearUserInfo()
  router.push('/login')
}
</script>


<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登录模板和非登录模板 -->
        <!-- 登陆时显示第一块，非登录时选择第二块  -->
        <!-- 根据是否有token来判断 -->
        <template v-if="UserStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ UserStore.userInfo.account }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;"><RouterLink to="/member/order">我的订单</RouterLink></a></li>
          <li><a href="javascript:;"><RouterLink to="/member/user">个人中心</RouterLink></a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>@/stores/userStore@/stores/userStores@/stores/userStore@/stores/userStores