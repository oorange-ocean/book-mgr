<template>
  <div>
    <a-card>
        <h2 style="text-align: left;">用户管理</h2>
        <a-divider></a-divider>
        <div style="display: flex; justify-content: flex-start;">
          <a-button type="default">添加用户</a-button>
        </div>
        <a-divider></a-divider>
        <div>
          <a-table :columns="columns" :data-source="list">
              <template #createdAt="{record}">
                {{ formatTimestamp(record.meta.createdAt) }}
              </template>
              <template #actions>
                <a href="javascript:;">重置密码</a>&nbsp;
                <a href="javascript:;">删除</a>
              </template>
          </a-table>
          </div>
    </a-card>
  </div>
</template>

<script src="./index.js">

</script>

<style lang="scss" scoped>
@import './index.scss'

</style>