<template>
  <div>
    <a-card>
        <h2 style="text-align: left;">用户管理</h2>
        <a-divider></a-divider>
       
          <space-between>
            <div class="search">
          <a-input-search placeholder="根据账户搜索"
            v-model:value="keyword"
            @search="onSearch"
            enter-button >
          </a-input-search>
          <a v-if="isSearch" href="javascript:;" @click="backAll" >返回</a>
        </div>
          <a-button @click="showAddModal=true">添加用户</a-button>
          </space-between>
          
        
        <a-divider></a-divider>
        <div>
          <a-table :columns="columns" :data-source="list">
              <template #createdAt="{record}">
                {{ formatTimestamp(record.meta.createdAt) }}
              </template>
              <template #actions="{record}">
                <a href="javascript:;" @click="resetPassword(record)">重置密码</a>&nbsp;
                <a href="javascript:;" @click="remove(record)">删除</a>
              </template>
              <template #character="{record}">
                <a href="javascript:;" @click="onEdit(record)"> <EditOutlined /> </a>
                {{ getCharacterInfoById(record.character).title }}
              </template>
          </a-table>
          </div>
    </a-card>
    <add-one v-model:open="showAddModal" @getUser="getUser" ></add-one>
    <a-modal
      v-model:visible="showEditCharacterModal"
      title="修改角色"
      @ok="updateCharacter"
    >
      <a-select
        v-model:value="editForm.character"
        style="width: 220px;"
      >
        <a-select-option
          v-for="item in characterInfo"
          :key="item._id"
          :value="item._id"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src="./index.js">

</script>

<style lang="scss" scoped>
@import './index.scss'

</style>