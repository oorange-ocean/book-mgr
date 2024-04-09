<template>
  <div>
    <a-card>
      <h2 style="text-align: left;">图书借阅</h2>
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
      
     
      </space-between>
    <a-divider/>
    <a-table :columns="columns" :data-source="list">
      <template #classify="{ record }">
          {{ getClassifyTitleById(record.classify) }}
        </template>
      <template #publishDate="data"> 
          {{ formatTimestamp(data.record.publishDate) }}
        </template>

      <template #actions="record">
        
        <a href="javascript:;" @click="borrow(record)">借阅</a>&nbsp;
      </template>
      
    </a-table>
    </a-card>
    
    <update v-model:open="showUpdateModal" :book="curEditBook"  />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
<script src="./index.jsx"></script>