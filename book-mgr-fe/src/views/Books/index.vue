<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search placeholder="根据书名搜索"
            v-model:value="keyword"
            @search="onSearch"
            enter-button>
          </a-input-search>
          <a v-if="isSearch" href="javascript:;" @click="backAll" >返回</a>
        </div>
      
      <a-button @click="open = true">添加一条</a-button>
      </space-between>
    <a-divider/>
    <a-table :columns="columns" :data-source="list">
      <template #publishDate="data"> 
          {{ formatTimestamp(data.record.publishDate) }}
        </template>

      <template #actions="record">
        
        <a href="javascript:;" @click="toDetail(record)">详情</a>&nbsp;
        <a href="javascript:;" @click="Update(record)">编辑</a>&nbsp;
        <a href="javascript:;" @click="remove(record)">删除</a>
      </template>
      <template #count="data"> 
        <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>&nbsp;

          {{ data.record.count }}
          &nbsp;<a href="javascript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>

        </template>
    </a-table>
    </a-card>
    <add-one v-model:open="open"  @getList="getList"/>
    <update v-model:open="showUpdateModal" :book="curEditBook"  />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
<script src="./index.jsx"></script>