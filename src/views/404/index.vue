<!--
 * @Description: 404
 * @Author: ljf
 * @Date: 2022-09-13 15:30:40
 * @LastEditors: ljf
 * @LastEditTime: 2022-09-14 14:20:39
-->

<template>
     <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <a-button type="primary" @click="router.back">Back Home</a-button>
        </template>
    </a-result>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>