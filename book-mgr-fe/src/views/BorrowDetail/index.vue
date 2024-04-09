<template>
  <div>
    <div class="log">
      <a-card title="借阅记录" :headStyle="{ 'text-align': 'left' }">
        <template #extra>
          <span style="margin:12px">
            <a href="javascript:;" @click="logFilter('unreturned')">
              <CheckOutlined v-if="curLogType==='unreturned'" /> 
              未归还
            </a>
          </span>
          <span>
            <a href="javascript:;" @click="logFilter('returned')" style="margin-left:12px">
              <CheckOutlined v-if="curLogType==='returned'" />
              已归还
            </a>
          </span>
        </template>
        <div>
          <a-table :data-source="curLogType === 'unreturned' ? unreturnedBooks : returnedBooks" :columns="curLogType === 'unreturned' ? unreturnedColumns : returnedColumns">
            <template #actions="{ record }">
              <a-button type="primary" size="small" v-if="curLogType === 'unreturned'" @click="returnBook(record._id)">归还</a-button>&nbsp;
              <a-button type="primary" size="small" v-if="curLogType === 'unreturned'" @click="renewBook(record._id)">续借</a-button>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss'
</style>