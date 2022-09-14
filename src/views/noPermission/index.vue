<!--
 * @Description: 无权限
 * @Author: ljf
 * @Date: 2022-09-13 15:30:40
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 14:18:21
-->

<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button type="primary" @click="router.back">Back Home</a-button>
        </template>
    </a-result>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>